module.exports = function () {
  return [
    {
      $group: {
        _id: '$order_item',
        orders: {
          $push: {
            order_id: '$order_id',
            company_name: '$company_name',
            customer_address: '$customer_address'
          }
        },
        order_count: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        order_item: '$_id',
        order_count: 1,
        orders: 1
      }
    },
    {
      $sort: {
        order_count: -1
      }
    },
    {
      $unwind : "$orders"
    },
    {
      $project: {
        order_item: '$order_item',
        order_count: 1,
        order_id: '$orders.order_id',
        company_name: '$orders.company_name',
        customer_address: '$orders.customer_address'
      }
    }
  ];
};
