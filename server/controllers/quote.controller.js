const Quote = require('../models/quote.model');
const utils = require('../../utils');

const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find();
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
