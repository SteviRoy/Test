const moment = require("moment");

module.exports = {
  format_date: (dateStr) => {
    const date = moment(dateStr);
    return date.format("MMM DD YYYY");
  },
};
