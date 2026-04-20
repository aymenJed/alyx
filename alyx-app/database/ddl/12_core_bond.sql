-- ============================================================
-- ALYX-APP :: TABLES OBLIGATIONS
-- core_bond, core_bond_schedule
-- Contexte UMOA / BRVM — Obligations d'État et d'entreprises
-- PostgreSQL 14+
-- ============================================================

-- -------------------------------------------------------
-- 1. CORE_BOND — Référentiel des obligations
-- -------------------------------------------------------
CREATE TABLE core_bond (
    bond_id             BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_core_bond PRIMARY KEY,
    bond_code           VARCHAR(20)     NOT NULL,
    isin_code           VARCHAR(12)     NOT NULL,
    issuer_code         VARCHAR(20)     NOT NULL,
    issuer_name         VARCHAR(200),
    bond_type           VARCHAR(30)     NOT NULL,
    currency            CHAR(3)         NOT NULL DEFAULT 'XOF',
    payment_currency    CHAR(3)         NOT NULL DEFAULT 'XOF',
    nominal_value       NUMERIC(18,2)   NOT NULL,
    issue_price         NUMERIC(18,6),
    redemption_price    NUMERIC(18,6),
    interest_rate       NUMERIC(8,4),
    minimum_rate        NUMERIC(8,4),
    marginal_rate       NUMERIC(8,4),
    spread              NUMERIC(8,4),
    day_count_convention VARCHAR(10)    NOT NULL DEFAULT '30/360',
    issue_date          DATE            NOT NULL,
    value_date          DATE,
    maturity_date       DATE            NOT NULL,
    duration_months     INTEGER,
    coupons_per_year    INTEGER         NOT NULL DEFAULT 2,
    coupon_frequency    VARCHAR(20)     NOT NULL DEFAULT 'SEMI_ANNUAL',
    rate_type           VARCHAR(20)     NOT NULL DEFAULT 'FIXED',
    repayment_type      VARCHAR(20)     NOT NULL DEFAULT 'AMORTIZING',
    repayment_method    VARCHAR(50),
    issue_amount        NUMERIC(18,2)   NOT NULL,
    outstanding_amount  NUMERIC(18,2),
    quantity            BIGINT          NOT NULL,
    guarantee           TEXT,
    rating              VARCHAR(10),
    listing_status      VARCHAR(20)     NOT NULL DEFAULT 'LISTED',
    listing_market      VARCHAR(50),
    subscription_params JSONB,
    guarantee_params    JSONB,
    status              VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE',
    is_active           CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT uk_bond_code          UNIQUE (bond_code),
    CONSTRAINT uk_bond_isin          UNIQUE (isin_code),
    CONSTRAINT ck_bond_type          CHECK (bond_type IN (
        'OAT', 'BOA', 'OBMO', 'BTAN', 'BT', 'SUKUK', 'CONVERTIBLE', 'CORPORATE'
    )),
    CONSTRAINT ck_bond_currency      CHECK (currency IN ('XOF', 'XAF', 'USD', 'EUR')),
    CONSTRAINT ck_bond_rate_type     CHECK (rate_type IN ('FIXED', 'VARIABLE', 'INDEXED', 'ZERO_COUPON')),
    CONSTRAINT ck_bond_repayment     CHECK (repayment_type IN ('BULLET', 'AMORTIZING', 'IN_FINE')),
    CONSTRAINT ck_bond_coupon_freq   CHECK (coupon_frequency IN ('ANNUAL', 'SEMI_ANNUAL', 'QUARTERLY', 'MONTHLY', 'NONE')),
    CONSTRAINT ck_bond_listing       CHECK (listing_status IN ('LISTED', 'UNLISTED', 'DELISTED', 'SUSPENDED')),
    CONSTRAINT ck_bond_status        CHECK (status IN ('ACTIVE', 'REDEEMED', 'DEFAULTED', 'SUSPENDED')),
    CONSTRAINT ck_bond_active        CHECK (is_active IN ('Y', 'N')),
    CONSTRAINT ck_bond_day_count     CHECK (day_count_convention IN ('30/360', 'ACT/360', 'ACT/365', 'ACT/ACT')),
    CONSTRAINT ck_bond_nominal       CHECK (nominal_value > 0),
    CONSTRAINT ck_bond_amount        CHECK (issue_amount > 0),
    CONSTRAINT ck_bond_dates         CHECK (maturity_date > issue_date)
);

CREATE INDEX idx_bond_code       ON core_bond (bond_code);
CREATE INDEX idx_bond_isin       ON core_bond (isin_code);
CREATE INDEX idx_bond_issuer     ON core_bond (issuer_code);
CREATE INDEX idx_bond_type       ON core_bond (bond_type);
CREATE INDEX idx_bond_status     ON core_bond (status);
CREATE INDEX idx_bond_maturity   ON core_bond (maturity_date);
CREATE INDEX idx_bond_active     ON core_bond (is_active);
CREATE INDEX idx_bond_params     ON core_bond USING GIN (subscription_params);

CREATE TRIGGER trg_core_bond_upd
    BEFORE UPDATE ON core_bond
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  core_bond                   IS 'Référentiel des instruments obligataires UMOA. Source de vérité pour pricing et analytics.';
COMMENT ON COLUMN core_bond.isin_code         IS 'Code ISIN 12 caractères. Ex: CI0000018234';
COMMENT ON COLUMN core_bond.bond_type         IS 'OAT=Obligation Assimilable Trésor, BOA=Bon Assimilation État, OBMO=Obligation Marché';
COMMENT ON COLUMN core_bond.nominal_value     IS 'Valeur faciale d''une unité en FCFA. Standard UMOA: 10 000 FCFA';
COMMENT ON COLUMN core_bond.day_count_convention IS 'Convention de calcul des intérêts courus. Standard UMOA: 30/360';
COMMENT ON COLUMN core_bond.outstanding_amount   IS 'Encours restant dû après amortissements. Initialisé = issue_amount';
COMMENT ON COLUMN core_bond.subscription_params  IS 'JSONB: {minAmount, maxAmount, allotmentMethod, subscriptionPeriod}';

-- -------------------------------------------------------
-- 2. CORE_BOND_SCHEDULE — Échéancier des obligations
-- -------------------------------------------------------
CREATE TABLE core_bond_schedule (
    schedule_id         BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_core_bond_schedule PRIMARY KEY,
    bond_id             BIGINT          NOT NULL,
    installment_number  INTEGER         NOT NULL,
    due_date            DATE            NOT NULL,
    schedule_type       VARCHAR(20)     NOT NULL,
    initial_capital     NUMERIC(18,2),
    remaining_capital   NUMERIC(18,2),
    principal_amount    NUMERIC(18,2)   NOT NULL DEFAULT 0.00,
    interest_amount     NUMERIC(18,2)   NOT NULL DEFAULT 0.00,
    coupon_rate         NUMERIC(8,4),
    day_count_convention VARCHAR(10)    NOT NULL DEFAULT '30/360',
    days_elapsed        NUMERIC(8,2),
    coupon_accrued      CHAR(1)         NOT NULL DEFAULT 'N',
    coupon_paid         CHAR(1)         NOT NULL DEFAULT 'N',
    payment_date        DATE,
    amount_paid         NUMERIC(18,2),
    status              VARCHAR(20)     NOT NULL DEFAULT 'PENDING',
    is_active           CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT fk_schedule_bond     FOREIGN KEY (bond_id) REFERENCES core_bond(bond_id) ON DELETE CASCADE,
    CONSTRAINT uk_schedule_bond_num UNIQUE (bond_id, installment_number),
    CONSTRAINT ck_schedule_type     CHECK (schedule_type IN ('COUPON', 'PRINCIPAL', 'COUPON_PRINCIPAL')),
    CONSTRAINT ck_schedule_status   CHECK (status IN ('PENDING', 'PAID', 'OVERDUE', 'PARTIAL')),
    CONSTRAINT ck_schedule_accrued  CHECK (coupon_accrued IN ('Y', 'N')),
    CONSTRAINT ck_schedule_paid     CHECK (coupon_paid IN ('Y', 'N')),
    CONSTRAINT ck_schedule_active   CHECK (is_active IN ('Y', 'N'))
);

CREATE INDEX idx_schedule_bond    ON core_bond_schedule (bond_id);
CREATE INDEX idx_schedule_due     ON core_bond_schedule (due_date);
CREATE INDEX idx_schedule_status  ON core_bond_schedule (status);
CREATE INDEX idx_schedule_num     ON core_bond_schedule (bond_id, installment_number);

CREATE TRIGGER trg_bond_schedule_upd
    BEFORE UPDATE ON core_bond_schedule
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  core_bond_schedule                  IS 'Échéancier détaillé de chaque obligation. Généré à l''émission.';
COMMENT ON COLUMN core_bond_schedule.schedule_type    IS 'COUPON=intérêt seul, PRINCIPAL=remboursement seul, COUPON_PRINCIPAL=les deux';
COMMENT ON COLUMN core_bond_schedule.days_elapsed     IS 'Nombre de jours écoulés depuis dernière échéance (calcul intérêts courus)';
COMMENT ON COLUMN core_bond_schedule.coupon_accrued   IS 'Y=intérêts courus comptabilisés en comptabilité';
COMMENT ON COLUMN core_bond_schedule.coupon_paid      IS 'Y=coupon effectivement payé aux porteurs';

-- ============================================================
-- DONNÉES EXEMPLES — Obligations UMOA représentatives
-- ============================================================

-- OAT Côte d'Ivoire 7 ans (2022-2029)
INSERT INTO core_bond (
    bond_code, isin_code, issuer_code, issuer_name, bond_type,
    currency, nominal_value, issue_price, interest_rate,
    day_count_convention, issue_date, value_date, maturity_date,
    duration_months, coupons_per_year, coupon_frequency,
    rate_type, repayment_type,
    issue_amount, outstanding_amount, quantity,
    rating, listing_status, listing_market, status
) VALUES (
    'OAT-CI-7Y-2022', 'CI0000018001', 'CI-TRESOR', 'République de Côte d''Ivoire',
    'OAT', 'XOF', 10000.00, 100.00, 6.50,
    '30/360', '2022-03-15', '2022-03-20', '2029-03-15',
    84, 2, 'SEMI_ANNUAL',
    'FIXED', 'AMORTIZING',
    150000000000.00, 150000000000.00, 15000000,
    'B+', 'LISTED', 'BRVM', 'ACTIVE'
) ON CONFLICT (bond_code) DO NOTHING;

-- OAT Sénégal 5 ans (2023-2028)
INSERT INTO core_bond (
    bond_code, isin_code, issuer_code, issuer_name, bond_type,
    currency, nominal_value, issue_price, interest_rate,
    day_count_convention, issue_date, value_date, maturity_date,
    duration_months, coupons_per_year, coupon_frequency,
    rate_type, repayment_type,
    issue_amount, outstanding_amount, quantity,
    rating, listing_status, listing_market, status
) VALUES (
    'OAT-SN-5Y-2023', 'SN0000009002', 'SN-TRESOR', 'République du Sénégal',
    'OAT', 'XOF', 10000.00, 100.00, 6.00,
    '30/360', '2023-06-01', '2023-06-06', '2028-06-01',
    60, 2, 'SEMI_ANNUAL',
    'FIXED', 'BULLET',
    100000000000.00, 100000000000.00, 10000000,
    'B+', 'LISTED', 'BRVM', 'ACTIVE'
) ON CONFLICT (bond_code) DO NOTHING;

-- BOA Burkina Faso 3 ans (2024-2027)
INSERT INTO core_bond (
    bond_code, isin_code, issuer_code, issuer_name, bond_type,
    currency, nominal_value, issue_price, interest_rate,
    day_count_convention, issue_date, value_date, maturity_date,
    duration_months, coupons_per_year, coupon_frequency,
    rate_type, repayment_type,
    issue_amount, outstanding_amount, quantity,
    listing_status, listing_market, status
) VALUES (
    'BOA-BF-3Y-2024', 'BF0000005003', 'BF-TRESOR', 'Trésor du Burkina Faso',
    'BOA', 'XOF', 10000.00, 99.50, 7.25,
    '30/360', '2024-01-10', '2024-01-15', '2027-01-10',
    36, 1, 'ANNUAL',
    'FIXED', 'BULLET',
    50000000000.00, 50000000000.00, 5000000,
    'LISTED', 'BRVM', 'ACTIVE'
) ON CONFLICT (bond_code) DO NOTHING;

-- OBMO SGCI 5 ans (2023-2028) — Obligation corporate
INSERT INTO core_bond (
    bond_code, isin_code, issuer_code, issuer_name, bond_type,
    currency, nominal_value, issue_price, interest_rate,
    day_count_convention, issue_date, value_date, maturity_date,
    duration_months, coupons_per_year, coupon_frequency,
    rate_type, repayment_type,
    issue_amount, outstanding_amount, quantity,
    rating, listing_status, listing_market, status
) VALUES (
    'OBMO-SGCI-5Y-2023', 'CI0000019004', 'SGCI', 'Société Générale Côte d''Ivoire',
    'OBMO', 'XOF', 100000.00, 100.00, 7.50,
    '30/360', '2023-09-01', '2023-09-06', '2028-09-01',
    60, 2, 'SEMI_ANNUAL',
    'FIXED', 'IN_FINE',
    30000000000.00, 30000000000.00, 300000,
    'BBB-', 'LISTED', 'BRVM', 'ACTIVE'
) ON CONFLICT (bond_code) DO NOTHING;

-- Sukuk Mali 3 ans (2024-2027)
INSERT INTO core_bond (
    bond_code, isin_code, issuer_code, issuer_name, bond_type,
    currency, nominal_value, issue_price, interest_rate,
    day_count_convention, issue_date, value_date, maturity_date,
    duration_months, coupons_per_year, coupon_frequency,
    rate_type, repayment_type,
    issue_amount, outstanding_amount, quantity,
    listing_status, listing_market, status
) VALUES (
    'SUKUK-ML-3Y-2024', 'ML0000003005', 'ML-TRESOR', 'Trésor du Mali',
    'SUKUK', 'XOF', 10000.00, 100.00, 5.75,
    'ACT/365', '2024-03-01', '2024-03-06', '2027-03-01',
    36, 2, 'SEMI_ANNUAL',
    'FIXED', 'BULLET',
    75000000000.00, 75000000000.00, 7500000,
    'LISTED', 'BRVM', 'ACTIVE'
) ON CONFLICT (bond_code) DO NOTHING;

-- ============================================================
-- Échéanciers (2 premières échéances de chaque obligation)
-- ============================================================

-- OAT-CI-7Y-2022 : coupon semestriel = 10000 * 6.5% / 2 = 325 FCFA/titre
INSERT INTO core_bond_schedule (
    bond_id, installment_number, due_date, schedule_type,
    initial_capital, remaining_capital, principal_amount, interest_amount,
    coupon_rate, day_count_convention, coupon_paid, status
)
SELECT b.bond_id, 1, '2022-09-15', 'COUPON',
    150000000000.00, 150000000000.00, 0.00, 4875000000.00,
    6.50, '30/360', 'Y', 'PAID'
FROM core_bond b WHERE b.bond_code = 'OAT-CI-7Y-2022'
ON CONFLICT (bond_id, installment_number) DO NOTHING;

INSERT INTO core_bond_schedule (
    bond_id, installment_number, due_date, schedule_type,
    initial_capital, remaining_capital, principal_amount, interest_amount,
    coupon_rate, day_count_convention, coupon_paid, status
)
SELECT b.bond_id, 2, '2023-03-15', 'COUPON',
    150000000000.00, 150000000000.00, 0.00, 4875000000.00,
    6.50, '30/360', 'Y', 'PAID'
FROM core_bond b WHERE b.bond_code = 'OAT-CI-7Y-2022'
ON CONFLICT (bond_id, installment_number) DO NOTHING;

INSERT INTO core_bond_schedule (
    bond_id, installment_number, due_date, schedule_type,
    initial_capital, remaining_capital, principal_amount, interest_amount,
    coupon_rate, day_count_convention, coupon_paid, status
)
SELECT b.bond_id, 3, '2023-09-15', 'COUPON',
    150000000000.00, 150000000000.00, 0.00, 4875000000.00,
    6.50, '30/360', 'Y', 'PAID'
FROM core_bond b WHERE b.bond_code = 'OAT-CI-7Y-2022'
ON CONFLICT (bond_id, installment_number) DO NOTHING;

INSERT INTO core_bond_schedule (
    bond_id, installment_number, due_date, schedule_type,
    initial_capital, remaining_capital, principal_amount, interest_amount,
    coupon_rate, day_count_convention, coupon_paid, status
)
SELECT b.bond_id, 4, '2024-03-15', 'COUPON',
    150000000000.00, 150000000000.00, 0.00, 4875000000.00,
    6.50, '30/360', 'Y', 'PAID'
FROM core_bond b WHERE b.bond_code = 'OAT-CI-7Y-2022'
ON CONFLICT (bond_id, installment_number) DO NOTHING;

INSERT INTO core_bond_schedule (
    bond_id, installment_number, due_date, schedule_type,
    initial_capital, remaining_capital, principal_amount, interest_amount,
    coupon_rate, day_count_convention, coupon_paid, status
)
SELECT b.bond_id, 5, '2024-09-15', 'COUPON',
    150000000000.00, 150000000000.00, 0.00, 4875000000.00,
    6.50, '30/360', 'N', 'PENDING'
FROM core_bond b WHERE b.bond_code = 'OAT-CI-7Y-2022'
ON CONFLICT (bond_id, installment_number) DO NOTHING;

-- OAT-SN-5Y-2023 : coupon semestriel
INSERT INTO core_bond_schedule (
    bond_id, installment_number, due_date, schedule_type,
    initial_capital, remaining_capital, principal_amount, interest_amount,
    coupon_rate, day_count_convention, coupon_paid, status
)
SELECT b.bond_id, 1, '2023-12-01', 'COUPON',
    100000000000.00, 100000000000.00, 0.00, 3000000000.00,
    6.00, '30/360', 'Y', 'PAID'
FROM core_bond b WHERE b.bond_code = 'OAT-SN-5Y-2023'
ON CONFLICT (bond_id, installment_number) DO NOTHING;

INSERT INTO core_bond_schedule (
    bond_id, installment_number, due_date, schedule_type,
    initial_capital, remaining_capital, principal_amount, interest_amount,
    coupon_rate, day_count_convention, coupon_paid, status
)
SELECT b.bond_id, 2, '2024-06-01', 'COUPON',
    100000000000.00, 100000000000.00, 0.00, 3000000000.00,
    6.00, '30/360', 'N', 'PENDING'
FROM core_bond b WHERE b.bond_code = 'OAT-SN-5Y-2023'
ON CONFLICT (bond_id, installment_number) DO NOTHING;
