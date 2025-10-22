-- PostgreSQL schema for Organization & Users
CREATE TABLE organizations(
   org_id     SERIAL PRIMARY KEY ,


-- header details
  org_logo_url   VARCHAR(255),
   org_name   VARCHAR(100)  NOT NULL,
org_slug VARCHAR(100)  UNIQUE  NOT NULL , -- manually editable
  org_email VARCHAR(100) NOT NULL,
contact_number VARCHAR(20)  ,
website    VARCHAR(255)  ,

-- status of org
status VARCHAR(20) CHECK (status IN ('Active','Blocked','Inactive')) DEFAULT 'Active'  ,

-- contact info
primary_admin_name   VARCHAR(100),
primary_admin_email  VARCHAR(100),
support_email  VARCHAR(100),
phone_number  VARCHAR(20)  ,
alt_phone_number  VARCHAR(20) ,

-- maximum allowed coordinators
max_coordinators  INT  DEFAULT 5  ,

-- timezone & language
timezone VARCHAR(100) DEFAULT 'Asia/Colombo',
language VARCHAR(50) DEFAULT 'English'  ,

-- official website
official_website VARCHAR(255)  ,

-- metadata
created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP  ,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);




CREATE TABLE organization_users(
  user_id SERIAL PRIMARY KEY  ,
  org_id INT REFERENCES organizations(org_id) ON DELETE CASCADE  ,
user_name  VARCHAR(100)  NOT NULL  ,
email VARCHAR(100) NOT NULL UNIQUE ,
role VARCHAR(20) CHECK (role IN ('Admin','Coordinator','Member')) NOT NULL  ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

