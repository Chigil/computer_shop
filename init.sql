CREATE TABLE public.discount_type (
	id uuid NOT NULL,
	"type" varchar(255) NOT NULL
);

CREATE TABLE public.discount (
	id uuid NOT NULL,
	amount float8 NOT NULL,
	discount_type_id uuid NULL,
	CONSTRAINT discount_amount_key UNIQUE (amount),
	CONSTRAINT discount_pkey PRIMARY KEY (id)
);

CREATE TABLE public."role" (
	id uuid NOT NULL,
	ident varchar(255) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT role_ident_key UNIQUE (ident),
	CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE public.loyalty_program (
	id uuid NOT NULL,
	discount_id uuid NULL,
	CONSTRAINT loyalty_program_pkey PRIMARY KEY (id)
);

-- public.loyalty_program foreign keys

ALTER TABLE public.loyalty_program ADD CONSTRAINT loyalty_program_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discount(id) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE public.status (
	id uuid NOT NULL,
	"name" varchar(255) NOT NULL DEFAULT 'Added. In processing.'::character varying,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT status_name_key UNIQUE (name),
	CONSTRAINT status_pkey PRIMARY KEY (id)
);

CREATE TABLE public.product (
	id uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	price float8 NOT NULL DEFAULT '0'::double precision,
	amount int4 NOT NULL DEFAULT 0,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT product_name_key UNIQUE (name),
	CONSTRAINT product_pkey PRIMARY KEY (id)
);

CREATE TABLE public."set" (
	id uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	price float8 NOT NULL DEFAULT '0'::double precision,
	amount int4 NOT NULL DEFAULT 0,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT set_name_key UNIQUE (name),
	CONSTRAINT set_pkey PRIMARY KEY (id)
);

CREATE TABLE public.catalog_item (
	id uuid NOT NULL,
	title varchar(255) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	product_id uuid NULL,
	set_id uuid NULL,
	CONSTRAINT catalog_item_pkey PRIMARY KEY (id)
);

-- public.catalog_item foreign keys

ALTER TABLE public.catalog_item ADD CONSTRAINT catalog_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE public.product_set (
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	set_id uuid NOT NULL,
	product_id uuid NOT NULL,
	CONSTRAINT product_set_pkey PRIMARY KEY (set_id, product_id)
);

-- public.product_set foreign keys

ALTER TABLE public.product_set ADD CONSTRAINT product_set_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE public."user" (
	id uuid NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	username varchar(255) NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	loyalty_program_id uuid NULL,
	role_id uuid NULL,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE public."order" (
	id uuid NOT NULL,
	total_price float8 NOT NULL DEFAULT '0'::double precision,
	order_file varchar(255) NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	user_id uuid NULL,
	discount_id uuid NULL,
	status_id uuid NULL,
	CONSTRAINT order_pkey PRIMARY KEY (id)
);

-- public."order" foreign keys

ALTER TABLE public."order" ADD CONSTRAINT order_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discount(id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE public."order" ADD CONSTRAINT order_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.status(id) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE public.order_catalog_item (
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	order_id uuid NOT NULL,
	catalog_item uuid NOT NULL,
	CONSTRAINT order_catalog_item_pkey PRIMARY KEY (order_id, catalog_item)
);


-- public.order_catalog_item foreign keys

ALTER TABLE public.order_catalog_item ADD CONSTRAINT order_catalog_item_catalog_item_fkey FOREIGN KEY (catalog_item) REFERENCES public.catalog_item(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.order_catalog_item ADD CONSTRAINT order_catalog_item_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(id) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO public."role" (id,ident,created_at,updated_at)
	VALUES ('ec57cf91-5ea7-4b84-a9a2-2d3dc8b59e8f'::uuid,'CLIENT','now()','now()');
INSERT INTO public."role" (id,ident,created_at,updated_at)
	VALUES ('821150ab-a895-470d-a624-83d105d70550'::uuid,'ADMIN','now()','now()');

-- Auto-generated SQL script #202205051255
INSERT INTO public.product (id,"name",description,price,amount,created_at,updated_at)
	VALUES ('9e6bbe6e-259e-4b3e-aaa2-de64683bb948'::uuid,'Процессор AMD Ryzen 5 3600','Matisse, AM4, 6 ядер, частота 4.2/3.6 ГГц, кэш 3 МБ + 32 МБ, техпроцесс 7 нм, TDP 65W',614.0,5,'now()','now()');
INSERT INTO public.product (id,"name",description,price,amount,created_at,updated_at)
	VALUES ('343a20c6-c17a-4051-b946-da243c18d536'::uuid,'Видеокарта Gigabyte GeForce RTX 3050 Gaming OC 8G GV-N3050GAMING OC-8GD','NVIDIA GeForce RTX 3050 8 ГБ GDDR6 LHR, базовая частота 1550 МГц, 2560sp, частота памяти 14000 МГц, 128 бит, доп. питание: 8 pin, 2 слота, HDMI, DisplayPort',1608.0,2,'now()','now()');
INSERT INTO public.product (id,"name",description,price,amount,created_at,updated_at)
	VALUES ('cbb029ad-bcd0-41e6-b695-93204cbc7353'::uuid,'SSD Samsung 970 Evo Plus 500GB MZ-V7S500BW','500 ГБ, M.2, PCI Express 3.0 x4 (NVMe 1.3), контроллер Samsung Phoenix, микросхемы 3D TLC NAND, последовательный доступ: 3500/3200 MBps, случайный доступ: 480000/550000 IOps',288.0,3,'now()','now()');


-- Auto-generated SQL script #202205051259
INSERT INTO public."set" (id,"name",description,amount,created_at,updated_at)
	VALUES ('5c8b2b45-c132-4c98-aa83-662a7312b2fc'::uuid,'Основной','Комплект из базовых устройств для работы',1,'now()','now()');

-- Auto-generated SQL script #202205051300
INSERT INTO public.product_set (created_at,updated_at,set_id,product_id)
	VALUES ('now()','now()','5c8b2b45-c132-4c98-aa83-662a7312b2fc'::uuid,'343a20c6-c17a-4051-b946-da243c18d536'::uuid);
INSERT INTO public.product_set (created_at,updated_at,set_id,product_id)
	VALUES ('now()','now()','5c8b2b45-c132-4c98-aa83-662a7312b2fc'::uuid,'cbb029ad-bcd0-41e6-b695-93204cbc7353'::uuid);



-- Auto-generated SQL script #202205051305
INSERT INTO public.status (id,created_at,updated_at)
	VALUES ('4d198338-3253-4161-b597-9ff0e8597527'::uuid,'now()','now()');


-- Auto-generated SQL script #202205051307
INSERT INTO public.catalog_item (id,title,created_at,updated_at,product_id)
	VALUES ('61b4d775-fcdf-4841-830f-9478a739afc5'::uuid,'Игровые','now() ','now()','343a20c6-c17a-4051-b946-da243c18d536'::uuid);
INSERT INTO public.catalog_item (id,title,created_at,updated_at,set_id)
	VALUES ('de69d6b4-08d6-45b5-ba69-f75734b040fe'::uuid,'Игровые','now() ','now()','5c8b2b45-c132-4c98-aa83-662a7312b2fc'::uuid);

-- Auto-generated SQL script #202205051309
INSERT INTO public.discount_type (id,"type")
	VALUES ('102963ab-cd31-4486-9eb7-61669fa794f2'::uuid,'Скидка постоянного клиента');
-- Auto-generated SQL script #202205051309
INSERT INTO public.discount (id,amount,discount_type_id)
	VALUES ('c0c63049-945b-469e-829f-0d002ae2dad8'::uuid,15.0,'102963ab-cd31-4486-9eb7-61669fa794f2'::uuid);
-- Auto-generated SQL script #202205051310
INSERT INTO public.loyalty_program (id,discount_id)
	VALUES ('67b9a5db-ee6a-4aec-bb45-14f33328bfc3'::uuid,'c0c63049-945b-469e-829f-0d002ae2dad8'::uuid);
-- Auto-generated SQL script #202205051311
INSERT INTO public."user" (id,email,"password",username,created_at,updated_at,loyalty_program_id,role_id)
	VALUES ('e8583926-2b1e-4cdb-9c42-9e6c507e421b'::uuid,'justuser@gmail.com','12345','JustUser','now()','now()','67b9a5db-ee6a-4aec-bb45-14f33328bfc3'::uuid,'ec57cf91-5ea7-4b84-a9a2-2d3dc8b59e8f'::uuid);
-- Auto-generated SQL script #202205051311
INSERT INTO public."order" (id,created_at,updated_at,user_id,status_id)
	VALUES ('6eeba275-8e7f-4e92-ba68-e943c1fb610d'::uuid,'now()','now()','e8583926-2b1e-4cdb-9c42-9e6c507e421b'::uuid,'4d198338-3253-4161-b597-9ff0e8597527'::uuid);
-- Auto-generated SQL script #202205061319
INSERT INTO public.order_catalog_item (created_at,updated_at,order_id,catalog_item)
	VALUES ('now()','now()','6eeba275-8e7f-4e92-ba68-e943c1fb610d'::uuid,'de69d6b4-08d6-45b5-ba69-f75734b040fe'::uuid);