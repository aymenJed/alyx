-- ============================================================
-- ALYX-APP :: TABLES DE COMPTES
-- core_securities_account, core_cash_account
-- Contexte UMOA / BRVM — Dépositaire central DCBR
-- PostgreSQL 14+
-- ============================================================

-- -------------------------------------------------------
-- 1. CORE_SECURITIES_ACCOUNT — Comptes titres
-- -------------------------------------------------------
CREATE TABLE core_securities_account (
    account_id      BIGINT          GENERATED ALWAYS AS IDENTITY
                                    CONSTRAINT pk_sec_account PRIMARY KEY,
    investor_id     BIGINT          NOT NULL,
    account_number  VARCHAR(20)     NOT NULL,
    branch          VARCHAR(50),
    account_type    VARCHAR(20)     NOT NULL DEFAULT 'STANDARD',
    status          VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE',
    opening_date    DATE            NOT NULL DEFAULT CURRENT_DATE,
    closing_date    DATE,
    nominal_balance NUMERIC(18,2)   NOT NULL DEFAULT 0.00,
    currency        CHAR(3)         NOT NULL DEFAULT 'XOF',
    allow_purchase  CHAR(1)         NOT NULL DEFAULT 'Y',
    allow_sale      CHAR(1)         NOT NULL DEFAULT 'Y',
    purchase_limit  NUMERIC(18,2),
    notes           TEXT,
    is_active       CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    CONSTRAINT fk_sec_acc_investor  FOREIGN KEY (investor_id) REFERENCES core_investor(investor_id),
    CONSTRAINT uk_sec_acc_number    UNIQUE (account_number),
    CONSTRAINT ck_sec_acc_type      CHECK (account_type IN ('STANDARD', 'OMNIBUS', 'FIDUCIAIRE', 'PROP')),
    CONSTRAINT ck_sec_acc_status    CHECK (status IN ('ACTIVE', 'BLOCKED', 'SUSPENDED', 'CLOSED')),
    CONSTRAINT ck_sec_acc_currency  CHECK (currency IN ('XOF', 'XAF', 'USD', 'EUR', 'GBP')),
    CONSTRAINT ck_sec_acc_purchase  CHECK (allow_purchase IN ('Y', 'N')),
    CONSTRAINT ck_sec_acc_sale      CHECK (allow_sale IN ('Y', 'N')),
    CONSTRAINT ck_sec_acc_active    CHECK (is_active IN ('Y', 'N')),
    CONSTRAINT ck_sec_acc_balance   CHECK (nominal_balance >= 0)
);

CREATE INDEX idx_sec_acc_investor ON core_securities_account (investor_id);
CREATE INDEX idx_sec_acc_number   ON core_securities_account (account_number);
CREATE INDEX idx_sec_acc_status   ON core_securities_account (status);
CREATE INDEX idx_sec_acc_active   ON core_securities_account (is_active);

CREATE TRIGGER trg_sec_account_upd
    BEFORE UPDATE ON core_securities_account
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  core_securities_account              IS 'Comptes titres DCBR des investisseurs. Enregistrement des positions sur obligations/actions BRVM.';
COMMENT ON COLUMN core_securities_account.account_type IS 'STANDARD=particulier, OMNIBUS=agrégé, FIDUCIAIRE=gestion déléguée, PROP=compte propre';
COMMENT ON COLUMN core_securities_account.allow_purchase IS 'Y=souscription autorisée, N=blocage achat';
COMMENT ON COLUMN core_securities_account.purchase_limit  IS 'Plafond de souscription en FCFA (NULL=illimité)';

-- -------------------------------------------------------
-- 2. CORE_CASH_ACCOUNT — Comptes espèces
-- -------------------------------------------------------
CREATE TABLE core_cash_account (
    account_id      BIGINT          GENERATED ALWAYS AS IDENTITY
                                    CONSTRAINT pk_cash_account PRIMARY KEY,
    investor_id     BIGINT          NOT NULL,
    account_number  VARCHAR(20)     NOT NULL,
    branch          VARCHAR(50),
    account_type    VARCHAR(20)     NOT NULL DEFAULT 'CURRENT',
    status          VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE',
    opening_date    DATE            NOT NULL DEFAULT CURRENT_DATE,
    closing_date    DATE,
    balance         NUMERIC(18,2)   NOT NULL DEFAULT 0.00,
    blocked_balance NUMERIC(18,2)   NOT NULL DEFAULT 0.00,
    currency        CHAR(3)         NOT NULL DEFAULT 'XOF',
    interest_rate   NUMERIC(8,4)    DEFAULT 0.0000,
    debit_limit     NUMERIC(18,2),
    credit_limit    NUMERIC(18,2),
    notes           TEXT,
    is_active       CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    CONSTRAINT fk_cash_acc_investor FOREIGN KEY (investor_id) REFERENCES core_investor(investor_id),
    CONSTRAINT uk_cash_acc_number   UNIQUE (account_number),
    CONSTRAINT ck_cash_acc_type     CHECK (account_type IN ('CURRENT', 'SAVINGS', 'ESCROW', 'MARGIN')),
    CONSTRAINT ck_cash_acc_status   CHECK (status IN ('ACTIVE', 'BLOCKED', 'SUSPENDED', 'CLOSED')),
    CONSTRAINT ck_cash_acc_currency CHECK (currency IN ('XOF', 'XAF', 'USD', 'EUR', 'GBP')),
    CONSTRAINT ck_cash_acc_active   CHECK (is_active IN ('Y', 'N')),
    CONSTRAINT ck_cash_acc_balance  CHECK (balance >= 0),
    CONSTRAINT ck_cash_acc_blocked  CHECK (blocked_balance >= 0)
);

CREATE INDEX idx_cash_acc_investor ON core_cash_account (investor_id);
CREATE INDEX idx_cash_acc_number   ON core_cash_account (account_number);
CREATE INDEX idx_cash_acc_status   ON core_cash_account (status);
CREATE INDEX idx_cash_acc_active   ON core_cash_account (is_active);

CREATE TRIGGER trg_cash_account_upd
    BEFORE UPDATE ON core_cash_account
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  core_cash_account             IS 'Comptes espèces des investisseurs. Mouvements liés aux opérations sur titres.';
COMMENT ON COLUMN core_cash_account.blocked_balance IS 'Montant bloqué en attente de règlement d''opérations en cours';
COMMENT ON COLUMN core_cash_account.debit_limit     IS 'Découvert autorisé (NULL=aucun découvert)';

-- ============================================================
-- DONNÉES EXEMPLES
-- ============================================================

-- Comptes titres (un par investisseur)
INSERT INTO core_securities_account
    (investor_id, account_number, branch, account_type, status, opening_date, nominal_balance, currency)
SELECT i.investor_id,
       'SAC-' || LPAD(ROW_NUMBER() OVER (ORDER BY i.investor_id)::TEXT, 6, '0'),
       CASE i.country
           WHEN 'CÔTE D''IVOIRE' THEN 'ABIDJAN'
           WHEN 'SÉNÉGAL'        THEN 'DAKAR'
           WHEN 'BURKINA FASO'   THEN 'OUAGADOUGOU'
           ELSE 'SIÈGE'
       END,
       CASE i.investor_type
           WHEN 'INSTITUTIONAL' THEN 'OMNIBUS'
           WHEN 'CORPORATE'     THEN 'PROP'
           ELSE 'STANDARD'
       END,
       'ACTIVE',
       CURRENT_DATE - INTERVAL '180 days',
       0.00,
       'XOF'
FROM core_investor i
ON CONFLICT (account_number) DO NOTHING;

-- Comptes espèces (un par investisseur)
INSERT INTO core_cash_account
    (investor_id, account_number, branch, account_type, status, opening_date, balance, blocked_balance, currency)
SELECT i.investor_id,
       'CAC-' || LPAD(ROW_NUMBER() OVER (ORDER BY i.investor_id)::TEXT, 6, '0'),
       CASE i.country
           WHEN 'CÔTE D''IVOIRE' THEN 'ABIDJAN'
           WHEN 'SÉNÉGAL'        THEN 'DAKAR'
           WHEN 'BURKINA FASO'   THEN 'OUAGADOUGOU'
           ELSE 'SIÈGE'
       END,
       CASE i.investor_type
           WHEN 'INSTITUTIONAL' THEN 'ESCROW'
           WHEN 'CORPORATE'     THEN 'MARGIN'
           ELSE 'CURRENT'
       END,
       'ACTIVE',
       CURRENT_DATE - INTERVAL '180 days',
       -- Solde initial selon le type
       CASE i.investor_type
           WHEN 'INDIVIDUAL'    THEN 5000000.00
           WHEN 'CORPORATE'     THEN 50000000.00
           WHEN 'INSTITUTIONAL' THEN 500000000.00
       END,
       0.00,
       'XOF'
FROM core_investor i
ON CONFLICT (account_number) DO NOTHING;
