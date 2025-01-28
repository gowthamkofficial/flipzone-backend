
const { State, District } = require('../models');
const { SuccessResponse, FailureResponse } = require('../models/response.model');
const statesDistrcits = require('../utils/states-districts.json')
async function addStates() {

    try {
        await statesDistrcits.states.filter(async (ele, inx) => {

            const value = await State.create({ stateName: ele.state });
            await addDistricts(value.dataValues.stateId, ele.districts)
            if (statesDistrcits.states.length == inx + 1) {
                console.log('Created ever states')
            }

        })
    } catch (error) {

        console.log(error?.message);

    }



}



async function addDistricts(id, districts) {
    try {
        await districts.filter(async (ele, inx) => {
            const value = await District.create({ stateId: id, districtName: ele });
            if (districts.length == inx + 1) {
                console.log(`Created districts for ${id}`)
            }
        })
    } catch (error) {
        console.log(error?.message);
    }
}



const getAllStates = async (req, res) => {
    try {
        const states = await State.findAll();
         res.status(200).json(new SuccessResponse(true, 200, states.length > 0 ? 'Listed states successfully' : 'No state data found', states))
    } catch (error) {
         res.status(500).json(new FailureResponse(false, 500, 'Internal server error!', error?.message))
    }
}



const getDistricts = async (req, res) => {

    try {

        const { stateId } = req.params;

        const districts = await District.findAll({ where: { stateId } });
         res.status(districts.length > 0 ? 200 : 400).json(new SuccessResponse(districts.length > 0 ? true : false, districts.length > 0 ? 200 : 400, districts.length > 0 ? 'Listed districts successfully' : 'Invalid stateId', districts))
    } catch (error) {
         res.status(500).json(new FailureResponse(false, 500, 'Internal server error!', error?.message))
    }

}

module.exports = { addDistricts, addStates, getAllStates, getDistricts }