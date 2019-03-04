const Quote = require('../models/quote.model');
const utils = require('../../../utils');

const getQuotes = async (req, res, next) => {
  try {
    // pagination
    let pageNo = 1;
    let skip = 0;
    const perPage = 10;

    /**
     * we need 10 results per query
     * p=0: skip = 0
     * p=1: skip = 0
     * p=2: skip = 10*(2-1) => 10
     * p=3: skip = 10*(3-1) => 20
     */
    if (req.xop.p && req.xop.p > 1) {
      pageNo = req.xop.p;
      skip = perPage * (pageNo - 1);
    }

    const quotes = await Quote.find()
      .skip(skip)
      .limit(perPage);
    res.status(200).json(utils.buildResponse(false, '', quotes));
  } catch (e) {
    next(e);
  }
};

const addQuote = async (req, res, next) => {
  try {
    const newQuote = new Quote(req.xop);
    const quote = await newQuote.save();
    if (!quote) {
      next();
    }
    res.status(201).json(utils.buildResponse(false, '', quote));
  } catch (e) {
    next(e);
  }
};

const deleteQuote = async (req, res, next) => {
  try {
    const del = await Quote.deleteOne({ _id: req.xop.quoteId });
    if (!del) {
      next({});
    }
    res.status(204).json(utils.buildResponse(false));
  } catch (e) {
    next(e);
  }
};

const updateQuote = async (req, res, next) => {
  try {
    const update = await Quote.update(
      { _id: req.xop.quoteId },
      { $set: { quote: req.xop.quote, by: req.xop.by } }
    );
    if (!update) {
      next({});
    }
    res.status(204).json(utils.buildResponse(false));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getQuotes,
  addQuote,
  deleteQuote,
  updateQuote
};
