
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose');
var async = require('async');
var Order = mongoose.model('Order');
var data = require('../data');
var extend = require('util')._extend;

/**
 * Load
 */

exports.load = function (req, res, next, id) {
  Order.load(id, function (err, order) {
    if (err) return next(err);
    if (!order) return next(new Error('not found'));
    req.order = order;
    next();
  });
};

/**
 * List
 */

exports.index = function (req, res) {
  var company = req.param('company');
  var address = req.param('address');
  var criteria = {};

  // Filters
  if (company) criteria.company_name = company;
  if (address) criteria.customer_address = address;

  // Asynchronously query for the needed data
  async.parallel({
    orders: function (cb) {
      Order.list(criteria, cb);
    },
    companies: function (cb) {
      Order.distinct('company_name', cb);
    },
    addresses: function (cb) {
      Order.distinct('customer_address', cb);
    }
  }, function (err, result) {
    if (err) return res.render('500', { err: err });
    res.render('orders/index', extend({
      title: 'Orders',
      company: company,
      address: address
    }, result));
  });
};

/**
 * Create the dummy data
 */

exports.create = function (req, res) {
  data.forEach(function (o) {
    var order = new Order(o);
    order.save();
  });
  res.redirect('/orders');
};

/**
 * Delete order
 */

exports.delete = function (req, res) {
  var order = req.order;
  order.remove(function (err){
    if (err) return res.render('500', { err: err });
    res.redirect('/orders');
  });
}
