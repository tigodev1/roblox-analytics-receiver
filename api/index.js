const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const analyticsData = req.body;

        const { data, error } = await supabase
            .from('analytics_data')
            .insert([{ data: analyticsData }]);

        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).send('Internal Server Error');
        }

        return res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send('Internal Server Error');
    }
};