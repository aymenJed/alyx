-- ============================================================
-- ALYX-APP :: TABLE CORE_INVESTOR
-- Référentiel des investisseurs (personnes physiques et morales)
-- Contexte UMOA / BRVM
-- PostgreSQL 14+
-- ============================================================
CREATE TABLE core_investor (
    investor_id     BIGINT          GENERATED ALWAYS AS IDENTITY
                                    CONSTRAINT pk_core_investor PRIMARY KEY,
    investor_code   VARCHAR(20)     NOT NULL,
    investor_type   VARCHAR(20)     NOT NULL,       -- INDIVIDUAL | INSTITUTIONAL | CORPORATE
    last_name       VARCHAR(100)    NOT NULL,
    first_name      VARCHAR(100),
    company_name    VARCHAR(200),
    birth_date      DATE,
    birth_place     VARCHAR(100),
    nationality     VARCHAR(50),
    id_type         VARCHAR(20),                    -- CNI | PASSEPORT | RCCM | NIF
    id_number       VARCHAR(30),
    address         VARCHAR(500),
    postal_code     VARCHAR(10),
    city            VARCHAR(100),
    country         VARCHAR(50)     DEFAULT 'CÔTE D''IVOIRE',
    phone           VARCHAR(20),
    fax             VARCHAR(20),
    email           VARCHAR(150),
    occupation      VARCHAR(100),
    employer        VARCHAR(200),
    notes           TEXT,
    status          VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE',
    is_active       CHAR(1)         NOT NULL DEFAULT 'Y',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50),
    updated_by      VARCHAR(50),
    CONSTRAINT uk_investor_code    UNIQUE (investor_code),
    CONSTRAINT ck_investor_type    CHECK (investor_type IN ('INDIVIDUAL', 'INSTITUTIONAL', 'CORPORATE')),
    CONSTRAINT ck_investor_status  CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'CLOSED')),
    CONSTRAINT ck_investor_active  CHECK (is_active IN ('Y', 'N')),
    CONSTRAINT ck_investor_id_type CHECK (id_type IN ('CNI', 'PASSEPORT', 'RCCM', 'NIF', 'AUTRES') OR id_type IS NULL)
);

CREATE INDEX idx_investor_code     ON core_investor (investor_code);
CREATE INDEX idx_investor_type     ON core_investor (investor_type);
CREATE INDEX idx_investor_status   ON core_investor (status);
CREATE INDEX idx_investor_active   ON core_investor (is_active);
CREATE INDEX idx_investor_name     ON core_investor (last_name, first_name);
CREATE INDEX idx_investor_country  ON core_investor (country);

CREATE TRIGGER trg_core_investor_upd
    BEFORE UPDATE ON core_investor
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

COMMENT ON TABLE  core_investor               IS 'Référentiel unique des investisseurs physiques et moraux UMOA.';
COMMENT ON COLUMN core_investor.investor_code IS 'Code client unique. Ex: INV-2024-001';
COMMENT ON COLUMN core_investor.investor_type IS 'INDIVIDUAL=Personne physique, INSTITUTIONAL=Institutionnel, CORPORATE=Entreprise';
COMMENT ON COLUMN core_investor.id_type       IS 'Type de pièce d''identité: CNI/PASSEPORT pour physiques, RCCM/NIF pour moraux';
COMMENT ON COLUMN core_investor.status        IS 'Statut KYC/AML: ACTIVE|INACTIVE|SUSPENDED|CLOSED';

-- ============================================================
-- DONNÉES EXEMPLES
-- ============================================================

INSERT INTO core_investor (investor_code, investor_type, last_name, first_name,
    nationality, id_type, id_number, city, country, phone, email, status) VALUES
(
    'INV-2024-001', 'INDIVIDUAL', 'KONATÉ', 'Amadou',
    'Ivoirienne', 'CNI', 'CNI-CI-2024-00001',
    'Abidjan', 'CÔTE D''IVOIRE', '+225 0707000001', 'a.konate@email.ci', 'ACTIVE'
),
(
    'INV-2024-002', 'INDIVIDUAL', 'DIALLO', 'Fatoumata',
    'Sénégalaise', 'PASSEPORT', 'PSP-SN-2024-00002',
    'Dakar', 'SÉNÉGAL', '+221 770000002', 'f.diallo@email.sn', 'ACTIVE'
),
(
    'INV-2024-003', 'CORPORATE', 'SOGÉFINANCE', NULL,
    NULL, 'RCCM', 'RCCM-CI-ABJ-2024-B-00003',
    'Abidjan', 'CÔTE D''IVOIRE', '+225 2720000003', 'contact@sogefinance.ci', 'ACTIVE'
),
(
    'INV-2024-004', 'INSTITUTIONAL', 'CNAMGS', NULL,
    NULL, 'NIF', 'NIF-GA-2024-00004',
    'Libreville', 'GABON', '+241 060000004', 'direction@cnamgs.ga', 'ACTIVE'
),
(
    'INV-2024-005', 'INDIVIDUAL', 'OUÉDRAOGO', 'Issouf',
    'Burkinabè', 'CNI', 'CNI-BF-2024-00005',
    'Ouagadougou', 'BURKINA FASO', '+226 70000005', 'i.ouedraogo@email.bf', 'ACTIVE'
),
(
    'INV-2024-006', 'CORPORATE', 'NSIA BANQUE', NULL,
    NULL, 'RCCM', 'RCCM-CI-ABJ-2024-B-00006',
    'Abidjan', 'CÔTE D''IVOIRE', '+225 2720000006', 'dg@nsiabanque.ci', 'ACTIVE'
),
(
    'INV-2024-007', 'INDIVIDUAL', 'TRAORÉ', 'Mariam',
    'Malienne', 'PASSEPORT', 'PSP-ML-2024-00007',
    'Bamako', 'MALI', '+223 76000007', 'm.traore@email.ml', 'ACTIVE'
),
(
    'INV-2024-008', 'INSTITUTIONAL', 'CNRPS', NULL,
    NULL, 'NIF', 'NIF-TN-2024-00008',
    'Tunis', 'TUNISIE', '+216 71000008', 'contact@cnrps.gov.tn', 'ACTIVE'
)
ON CONFLICT (investor_code) DO NOTHING;
