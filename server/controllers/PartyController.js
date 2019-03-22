import party from '../model/partydb';

export default class PartyController {
/**
   * @method getAllParties
   * @description retrieves a list of all Parties
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

  static getAllParties(req, res) {
    res.status(200).send({
      status: 200,
      message: 'parties retrieved successfully',
      data: party,
    });
  }

  /**
   * @method createParty
   * @description Post a given response/parameter to party database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static createParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;
    const data = {
      id: party.length + 1,
      name,
      hqAddress,
      logoUrl,
    };
    console.log(data);
    console.log(req.body);
    party.push(data);
    return res.status(201).send({
      status: 200,
      message: 'parties created successfully',
      party,
    });
  }

  /**
   * @method getAParty
   * @description retrieves party with specific ID
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static getParty(req, res) {
    const { id } = req.params;

    const data = party.find(data => data.id === parseInt(id, 10));
    if (data) {
      return res.status(200).send({
        status: 200,
        message: 'party retrieved successfully',
        data: [data],
      });
    }
    res.status(404).send({
      error: 'no party found with that id',
    });
  }

  static deleteParty(req, res) {
    const { id } = req.params;
    const data = party.filter(data => data.id === id)[0];
    const index = party.indexOf(data);
    if (index !== -1) {
      party.splice(index, 1);
      res.status(200).json({
        status: 200,
        data: [{ message: `Party with id ${id} deleted.` }],
      });
  	} else {
  		res.status(201).json({
        message: `Party with id ${id} not found.` });
    }
  }

  static updatePartyName(req, res) {
    const { id } = req.params;
    const data = party.find(data => data.id === parseInt(id, 10));
    if (data) {
      data.name = req.body.name;
      return res.status(201).send({
        status: 201,
        message: 'party added successfully',
        data: [data],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'name of party not found!',
    });

  }
}



