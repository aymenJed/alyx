-- ============================================================
-- ALYX-APP :: TABLES OPÉRATIONS
-- ope_operation, ope_security_position, ope_cash_position
-- Contexte UMOA / BRVM
-- PostgreSQL 14+
-- ============================================================

-- -------------------------------------------------------
-- 1. OPE_OPERATION — Journal des opérations sur titres
-- -------------------------------------------------------
CREATE TABLE ope_operation (
    operation_id            BIGINT          GENERATED ALWAYS AS IDENTITY
                                            CONSTRAINT pk_ope_operation PRIMARY KEY,
    operation_number        VARCHAR(30)     NOT NULL,
    operation_type          VARCHAR(20)     NOT NULL,
    operation_date          DATE            NOT NULL,
    settlement_date         DATE,
    value_date              DATE,
    investor_id             BIGINT          NOT NULL,
    securities_account_id   BIGINT,
    cash_account_id         BIGINT,
    bond_id                 BIGINT,
    isin_code               VARCHAR(12),
    bond_code               VARCHAR(20),
    price                   NUMERIC(18,6),
    quantity                NUMERIC(18,6),
    gross_amount            NUMERIC(18,2),
    net_amount              NUMERIC(18,2),
    purchase_price          NUMERIC(18,6),
    sale_price              NUMERIC(18,6),
    coupon_gross_purchase   NUMERIC(18,2),
    coupon_net_purchase     NUMERIC(18,2),
    coupon_gross_accrued    NUMERIC(18,2),
    coupon_net_accrued      NUMERIC(18,2),
    coupon_gross_holding    NUMERIC(18,2),
    coupon_net_holding      NUMERIC(18,2),
    coupon_rs_purchase      NUMERIC(18,2),
    coupon_rs_accrued       NUMERIC(18,2),
    coupon_rs_holding       NUMERIC(18,2),
    commission              NUMERIC(18,2),
    tax                     NUMERIC(18,2),
    direction               VARCHAR(10)     NOT NULL,
    status                  VARCHAR(20)     NOT NULL DEFAULT 'PENDING',
    notes                   TEXT,
    reference               VARCHAR(50),
    counterparty            VARCHAR(200),
    is_active               CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by              VARCHAR(50),
    updated_by              VARCHAR(50),
    CONSTRAINT uk_operation_number   UNIQUE (operation_number),
    CONSTRAINT fk_ope_investor       FOREIGN KEY (investor_id)
                                     REFERENCES core_investor(investor_id),
    CONSTRAINT fk_ope_sec_account    FOREIGN KEY (securities_account_id)
                                     REFERENCES core_securities_account(account_id),
    CONSTRAINT fk_ope_cash_account   FOREIGN KEY (cash_account_id)
                                     REFERENCES core_cash_account(account_id),
    CONSTRAINT fk_ope_bond           FOREIGN KEY (bond_id)
                                     REFERENCES core_bond(bond_id),
    CONSTRAINT ck_ope_type           CHECK (operation_type IN (
        'SUBSCRIPTION', 'PURCHASE', 'SALE', 'REDEMPTION',
        'COUPON', 'TRANSFER_IN', 'TRANSFER_OUT', 'DIVIDEND'
    )),
    CONSTRAINT ck_ope_direction      CHECK (direction IN ('BUY', 'SELL', 'IN', 'OUT')),
    CONSTRAINT ck_ope_status         CHECK (status IN ('PENDING', 'CONFIRMED', 'SETTLED', 'CANCELLED', 'FAILED')),
    CONSTRAINT ck_ope_active         CHECK (is_active IN ('Y', 'N'))
);

CREATE INDEX idx_ope_number     ON ope_operation (operation_number);
CREATE INDEX idx_ope_investor   ON ope_operation (investor_id);
CREATE INDEX idx_ope_type       ON ope_operation (operation_type);
CREATE INDEX idx_ope_date       ON ope_operation (operation_date);
CREATE INDEX idx_ope_status     ON ope_operation (status);
CREATE INDEX idx_ope_bond       ON ope_operation (bond_id);
CREATE INDEX idx_ope_isin       ON ope_operation (isin_code);
CREATE INDEX idx_ope_sec_acc    ON ope_operation (securities_account_id);
CREATE INDEX idx_ope_cash_acc   ON ope_operation (cash_account_id);

CREATE TRIGGER trg_ope_operation_upd
    BEFORE UPDATE ON ope_operation
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  ope_operation                 IS 'Journal horodaté de toutes les opérations sur titres. Immutable après settlement.';
COMMENT ON COLUMN ope_operation.operation_number IS 'Numéro unique d''opération. Format: OPE-AAAA-NNNNNN';
COMMENT ON COLUMN ope_operation.operation_type  IS 'SUBSCRIPTION=souscription primaire, PURCHASE/SALE=marché secondaire, REDEMPTION=remboursement';
COMMENT ON COLUMN ope_operation.direction       IS 'BUY/SELL=sens de l''opération, IN/OUT=mouvement espèces';
COMMENT ON COLUMN ope_operation.gross_amount    IS 'Montant brut avant commissions et taxes (quantité × prix × nominal)';
COMMENT ON COLUMN ope_operation.net_amount      IS 'Montant net à régler (brut - commission - taxe)';
COMMENT ON COLUMN ope_operation.coupon_gross_purchase IS 'Intérêts courus bruts acheteur (obligation avec coupon couru)';

-- -------------------------------------------------------
-- 2. OPE_SECURITY_POSITION — Positions titres
-- -------------------------------------------------------
CREATE TABLE ope_security_position (
    position_id             BIGINT          GENERATED ALWAYS AS IDENTITY
                                            CONSTRAINT pk_sec_position PRIMARY KEY,
    securities_account_id   BIGINT          NOT NULL,
    bond_id                 BIGINT,
    isin_code               VARCHAR(12),
    bond_code               VARCHAR(20),
    quantity                NUMERIC(18,6)   NOT NULL,
    average_cost            NUMERIC(18,6)   NOT NULL,
    unit_cost               NUMERIC(18,6),
    current_price           NUMERIC(18,6),
    market_value            NUMERIC(18,2),
    unrealized_gain_loss    NUMERIC(18,2),
    realized_gain_loss      NUMERIC(18,2),
    position_start_date     DATE            NOT NULL DEFAULT CURRENT_DATE,
    position_end_date       DATE,
    position_status         VARCHAR(20)     NOT NULL DEFAULT 'OPEN',
    coupon_accrued          NUMERIC(18,2),
    coupon_received         NUMERIC(18,2),
    coupon_net              NUMERIC(18,2),
    last_transaction_date   DATE,
    is_active               CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by              VARCHAR(50),
    updated_by              VARCHAR(50),
    CONSTRAINT fk_secpos_account FOREIGN KEY (securities_account_id)
                                 REFERENCES core_securities_account(account_id),
    CONSTRAINT fk_secpos_bond    FOREIGN KEY (bond_id) REFERENCES core_bond(bond_id),
    CONSTRAINT ck_secpos_status  CHECK (position_status IN ('OPEN', 'CLOSED', 'PARTIAL')),
    CONSTRAINT ck_secpos_active  CHECK (is_active IN ('Y', 'N')),
    CONSTRAINT ck_secpos_qty     CHECK (quantity >= 0)
);

CREATE INDEX idx_secpos_account ON ope_security_position (securities_account_id);
CREATE INDEX idx_secpos_bond    ON ope_security_position (bond_id);
CREATE INDEX idx_secpos_isin    ON ope_security_position (isin_code);
CREATE INDEX idx_secpos_status  ON ope_security_position (position_status);
CREATE INDEX idx_secpos_active  ON ope_security_position (is_active);

CREATE TRIGGER trg_sec_position_upd
    BEFORE UPDATE ON ope_security_position
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  ope_security_position               IS 'Positions titres consolidées par compte. Mise à jour après chaque opération.';
COMMENT ON COLUMN ope_security_position.average_cost  IS 'Coût moyen pondéré en FCFA par titre (calcul LIFO/FIFO selon paramétrage)';
COMMENT ON COLUMN ope_security_position.market_value  IS 'Valeur de marché = quantité × cours actuel × valeur nominale';
COMMENT ON COLUMN ope_security_position.coupon_accrued IS 'Intérêts courus à recevoir sur la position (valorisation J)';

-- -------------------------------------------------------
-- 3. OPE_CASH_POSITION — Positions espèces
-- -------------------------------------------------------
CREATE TABLE ope_cash_position (
    position_id         BIGINT          GENERATED ALWAYS AS IDENTITY
                                        CONSTRAINT pk_cash_position PRIMARY KEY,
    cash_account_id     BIGINT          NOT NULL,
    account_number      VARCHAR(20),
    balance             NUMERIC(18,2)   NOT NULL,
    blocked_balance     NUMERIC(18,2)   DEFAULT 0.00,
    available_balance   NUMERIC(18,2),
    currency            CHAR(3)         NOT NULL DEFAULT 'XOF',
    interest_earned     NUMERIC(18,2)   DEFAULT 0.00,
    interest_paid       NUMERIC(18,2)   DEFAULT 0.00,
    fees                NUMERIC(18,2)   DEFAULT 0.00,
    debits              NUMERIC(18,2)   DEFAULT 0.00,
    credits             NUMERIC(18,2)   DEFAULT 0.00,
    position_start_date DATE            NOT NULL DEFAULT CURRENT_DATE,
    position_end_date   DATE,
    position_status     VARCHAR(20)     NOT NULL DEFAULT 'OPEN',
    average_balance     NUMERIC(18,2),
    minimum_balance     NUMERIC(18,2),
    maximum_balance     NUMERIC(18,2),
    last_transaction_date DATE,
    is_active           CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by          VARCHAR(50),
    updated_by          VARCHAR(50),
    CONSTRAINT fk_cashpos_account FOREIGN KEY (cash_account_id)
                                  REFERENCES core_cash_account(account_id),
    CONSTRAINT ck_cashpos_status  CHECK (position_status IN ('OPEN', 'CLOSED')),
    CONSTRAINT ck_cashpos_currency CHECK (currency IN ('XOF', 'XAF', 'USD', 'EUR', 'GBP')),
    CONSTRAINT ck_cashpos_active  CHECK (is_active IN ('Y', 'N'))
);

CREATE INDEX idx_cashpos_account ON ope_cash_position (cash_account_id);
CREATE INDEX idx_cashpos_status  ON ope_cash_position (position_status);
CREATE INDEX idx_cashpos_active  ON ope_cash_position (is_active);

CREATE TRIGGER trg_cash_position_upd
    BEFORE UPDATE ON ope_cash_position
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  ope_cash_position                  IS 'Positions espèces consolidées par compte. Mise à jour après chaque mouvement.';
COMMENT ON COLUMN ope_cash_position.blocked_balance  IS 'Montant réservé pour opérations en attente de règlement';
COMMENT ON COLUMN ope_cash_position.available_balance IS 'balance - blocked_balance. Calculé automatiquement.';

-- ============================================================
-- DONNÉES EXEMPLES
-- ============================================================

-- Opérations de souscription primaire (J+1 après émission)
INSERT INTO ope_operation (
    operation_number, operation_type, operation_date, settlement_date, value_date,
    investor_id, securities_account_id, cash_account_id, bond_id,
    isin_code, bond_code, price, quantity,
    gross_amount, commission, tax, net_amount,
    direction, status, reference
)
SELECT
    'OPE-2022-000001',
    'SUBSCRIPTION',
    '2022-03-16',
    '2022-03-20',
    '2022-03-20',
    inv.investor_id,
    sa.account_id,
    ca.account_id,
    b.bond_id,
    b.isin_code,
    b.bond_code,
    100.00,
    500.00,
    5000000.00,
    25000.00,
    0.00,
    4975000.00,
    'BUY',
    'SETTLED',
    'REF-DCBR-2022-001'
FROM core_investor inv
JOIN core_securities_account sa ON sa.investor_id = inv.investor_id
JOIN core_cash_account ca        ON ca.investor_id = inv.investor_id
JOIN core_bond b                 ON b.bond_code = 'OAT-CI-7Y-2022'
WHERE inv.investor_code = 'INV-2024-001'
LIMIT 1
ON CONFLICT (operation_number) DO NOTHING;

-- Souscription OAT Sénégal — investisseur institutionnel
INSERT INTO ope_operation (
    operation_number, operation_type, operation_date, settlement_date, value_date,
    investor_id, securities_account_id, cash_account_id, bond_id,
    isin_code, bond_code, price, quantity,
    gross_amount, commission, tax, net_amount,
    direction, status, reference
)
SELECT
    'OPE-2023-000001',
    'SUBSCRIPTION',
    '2023-06-02',
    '2023-06-06',
    '2023-06-06',
    inv.investor_id,
    sa.account_id,
    ca.account_id,
    b.bond_id,
    b.isin_code,
    b.bond_code,
    100.00,
    5000.00,
    500000000.00,
    1000000.00,
    0.00,
    499000000.00,
    'BUY',
    'SETTLED',
    'REF-DCBR-2023-001'
FROM core_investor inv
JOIN core_securities_account sa ON sa.investor_id = inv.investor_id
JOIN core_cash_account ca        ON ca.investor_id = inv.investor_id
JOIN core_bond b                 ON b.bond_code = 'OAT-SN-5Y-2023'
WHERE inv.investor_code = 'INV-2024-004'
LIMIT 1
ON CONFLICT (operation_number) DO NOTHING;

-- Achat marché secondaire — OAT CI
INSERT INTO ope_operation (
    operation_number, operation_type, operation_date, settlement_date, value_date,
    investor_id, securities_account_id, cash_account_id, bond_id,
    isin_code, bond_code, price, quantity,
    gross_amount, commission, coupon_gross_purchase, coupon_net_purchase, net_amount,
    direction, status, counterparty, reference
)
SELECT
    'OPE-2024-000001',
    'PURCHASE',
    '2024-01-15',
    '2024-01-17',
    '2024-01-17',
    inv.investor_id,
    sa.account_id,
    ca.account_id,
    b.bond_id,
    b.isin_code,
    b.bond_code,
    101.25,
    200.00,
    20250000.00,
    101250.00,
    350000.00,
    315000.00,
    20701250.00,
    'BUY',
    'SETTLED',
    'NSIA BANQUE CI',
    'REF-BRVM-2024-001'
FROM core_investor inv
JOIN core_securities_account sa ON sa.investor_id = inv.investor_id
JOIN core_cash_account ca        ON ca.investor_id = inv.investor_id
JOIN core_bond b                 ON b.bond_code = 'OAT-CI-7Y-2022'
WHERE inv.investor_code = 'INV-2024-002'
LIMIT 1
ON CONFLICT (operation_number) DO NOTHING;

-- Positions titres — OAT-CI pour investisseur 1
INSERT INTO ope_security_position (
    securities_account_id, bond_id, isin_code, bond_code,
    quantity, average_cost, unit_cost, current_price, market_value,
    unrealized_gain_loss, realized_gain_loss,
    position_start_date, position_status,
    coupon_accrued, coupon_received
)
SELECT
    sa.account_id,
    b.bond_id,
    b.isin_code,
    b.bond_code,
    500.00,                 -- 500 titres
    10000.00,               -- coût moyen au pair
    10000.00,
    10125.00,               -- cours actuel 101.25%
    5062500.00,             -- 500 * 10125
    62500.00,               -- plus-value latente
    0.00,
    '2022-03-20',
    'OPEN',
    35000.00,               -- intérêts courus
    975000.00               -- coupons déjà reçus (4 semestres)
FROM core_investor inv
JOIN core_securities_account sa ON sa.investor_id = inv.investor_id
JOIN core_bond b ON b.bond_code = 'OAT-CI-7Y-2022'
WHERE inv.investor_code = 'INV-2024-001'
LIMIT 1;

-- Position titres — OAT-SN pour investisseur institutionnel
INSERT INTO ope_security_position (
    securities_account_id, bond_id, isin_code, bond_code,
    quantity, average_cost, unit_cost, current_price, market_value,
    unrealized_gain_loss, realized_gain_loss,
    position_start_date, position_status,
    coupon_accrued, coupon_received
)
SELECT
    sa.account_id,
    b.bond_id,
    b.isin_code,
    b.bond_code,
    5000.00,                -- 5000 titres
    10000.00,
    10000.00,
    9980.00,                -- légère décote
    49900000.00,
    -100000.00,             -- perte latente marginale
    0.00,
    '2023-06-06',
    'OPEN',
    150000.00,
    3000000.00              -- 1 coupon reçu
FROM core_investor inv
JOIN core_securities_account sa ON sa.investor_id = inv.investor_id
JOIN core_bond b ON b.bond_code = 'OAT-SN-5Y-2023'
WHERE inv.investor_code = 'INV-2024-004'
LIMIT 1;

-- Positions espèces — soldes courants
INSERT INTO ope_cash_position (
    cash_account_id, account_number,
    balance, blocked_balance, available_balance,
    currency, interest_earned, debits, credits,
    position_start_date, position_status,
    last_transaction_date
)
SELECT
    ca.account_id,
    ca.account_number,
    ca.balance,
    ca.blocked_balance,
    ca.balance - ca.blocked_balance,
    ca.currency,
    0.00,
    CASE WHEN inv.investor_type = 'INDIVIDUAL' THEN 4975000.00
         WHEN inv.investor_type = 'INSTITUTIONAL' THEN 499000000.00
         ELSE 0.00 END,
    CASE WHEN inv.investor_type = 'INDIVIDUAL' THEN 5000000.00
         WHEN inv.investor_type = 'INSTITUTIONAL' THEN 500000000.00
         ELSE 0.00 END,
    ca.opening_date,
    'OPEN',
    CURRENT_DATE - INTERVAL '30 days'
FROM core_investor inv
JOIN core_cash_account ca ON ca.investor_id = inv.investor_id
WHERE inv.investor_code IN ('INV-2024-001', 'INV-2024-004');
