const pool = require('../db/index');


                // to get  orgs list 

exports.getAllOrgs = async (req, res) => {
  
  
  try {
    const result = await pool.query('SELECT * FROM organizations ORDER BY org_id');
    res.json(result.rows);

  } catch (err) {
    console.error('getAllOrgs error:',  err);

    res.status(500).json({ error: 'Something went wrong' });
  }
};

                      // get org by id

exports.getOrgById = async (req, res) => {
    const id = req.params.id;
  try {
    const result  = await  pool.query ('SELECT * FROM organizations WHERE org_id = $1', [id]);
    if (result.rows.length === 0) 
      return   res.status(404).json({ error: 'Organization not found' });
    res.json(result.rows[0]);

  } catch (err) {
    console.error('getOrgById error:', err);
        res.status(500).json({ error: 'Something went wrong' });
  }

};





                            // add new org {only few fields will be taken for initial create }

exports.addOrg = async (req, res) => {

    const data = req.body;

                   // required fields for initial create
  const { org_name, org_slug, org_email, contact_number } = data;

  if (!org_name || !org_slug || !org_email || !contact_number) {

    return res.status(400).json({ error: 'org_name, org_slug, org_email and contact_number are required' });
  }

  try {

    
    const result = await pool.query(
      `INSERT INTO organizations (
         org_name, org_slug, org_email, contact_number
       ) VALUES ($1,$2,$3,$4) RETURNING *`,
      [org_name, org_slug, org_email, contact_number]
    );

    
    res.status(201).json(result.rows[0]);


  } catch (err) {
    console.error('addOrg error:', err);
    // unique slug/email constraint likely
    if (err.code === '23505') {

      return res.status(409).json({   error: 'org_slug or org_email already exists' });
    }

    res.status(500).json({  error: 'Cannot add org' });
  }
};




                                      // update org (full update of all fields )

      exports.updateOrg = async (req, res) => {
  const id = req.params.id;

  const data = req.body;


  // We'll set all editable fields (fields not provided will be set to NULL if explicitly sent as null)
  // Order must match the VALUES array below.
  const fields = [
    'org_logo_url', 'org_name', 'org_slug', 'org_email', 'contact_number', 'website',
    'status', 'primary_admin_name', 'primary_admin_email', 'support_email',
    'phone_number', 'alt_phone_number', 'max_coordinators', 'timezone', 'language',
    'official_website'
  ];

  const values   = fields.map((f) => data[f] === undefined ? null : data[f]);

  try {

    const result = await pool.query(

      `UPDATE organizations SET
         org_logo_url = $1, org_name = $2, org_slug = $3, org_email = $4,    contact_number = $5,
         website = $6, status = $7, primary_admin_name =  $8, primary_admin_email = $9,      support_email = $10,
         phone_number = $11, alt_phone_number = $12, max_coordinators = $13, timezone = $14,     language = $15,
         official_website = $16, updated_at = CURRENT_TIMESTAMP
       WHERE org_id = $17
       RETURNING *`,
      [...values, id]

    );





    if (result.rows.length === 0) 
        return res.status(404).json({ error: 'Organization not found' });

    res.json(result.rows[0]);

  } catch (err) {
      console.error('updateOrg error:', err);
    if (err.code === '23505') {
      return  res.status(409).json({   error: 'org_slug or org_email already exists' });
    }

    res.status(500).json({ error:   'Cannot update org' });
  }  

  
};
