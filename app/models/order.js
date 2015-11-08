'use strict';

/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Pipeline = require('./pipeline');
var Schema = mongoose.Schema;

/**
 * Order schema
 */

var OrderSchema = new Schema({
  order_id: { type: Number, required: true },
  company_name: { type: String, default: '', required: true },
  customer_address: { type: String, default: '', required: true },
  order_item: { type: String, default: '', required: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true }
});

/**
 * Methods
 */

OrderSchema.statics = {

  /**
   * Load
   */

  load: function (id, cb) {
    this.findOne({ _id: id }, cb);
  },

  /**
   * Distinct
   */

  distinct: function (field, cb) {
    this.find().distinct(field, cb);
  },

  /**
   * List items by grouping them by order count
   */

  list: function (criteria, cb) {
    var pipeline = Pipeline();
    pipeline.unshift({ $match: criteria });

    // Aggregation operation
    // https://docs.mongodb.org/manual/reference/operator/aggregation/
    this.aggregate(pipeline, cb);
  }
};

/**
 * Register
 */

mongoose.model('Order', OrderSchema);
