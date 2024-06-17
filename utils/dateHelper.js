const AppError = require("./appError");

exports.addMonths = function (date, num) {
  if (num === 0) return date;
  const tempDate = new Date(date);
  return new Date(tempDate.setUTCMonth(tempDate.getUTCMonth() + num));
};

exports.getDateRange = function (startDate, endDate) {
  return (
    Math.abs(
      12 * (endDate.getUTCFullYear() - startDate.getUTCFullYear()) -
        (startDate.getUTCMonth() - endDate.getUTCMonth())
    ) + 1
  );
};

exports.getYearMonth = function (date) {
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  if (month < 10) month = "0" + month;

  return `${year}-${month}`;
};

exports.isValidDateString = function (strArr) {
  strArr.forEach((str) => {
    const [year, month] = str.split("-");

    if (year.length !== 4)
      throw new AppError("Year must be in YYYY format", 400);
    if (!(parseInt(year) >= 2000))
      throw new AppError(
        "Invalid year, must be greater than or equal to 2000",
        400
      );

    const monthNum = parseInt(month);
    if (month.length !== 2)
      throw new AppError("Month must be in MM format", 400);
    if (monthNum < 1 || monthNum > 12)
      throw new AppError("Invalid month, must be between 01-12");
  });

  return true;
};

exports.isValidDateRange = function (startDate, endDate) {
  // TODO: Check if end date is beyond current month
  if (isNaN(startDate) || isNaN(endDate))
    throw new AppError("Dates must be in YYYY-MM format", 400);

  if (endDate < startDate)
    throw new AppError(
      "Start date must be less than or equal to end date",
      400
    );

  if (this.getDateRange(startDate, endDate) > process.env.MATCH_RANGE_LIMIT)
    throw new AppError(
      `Range must be a maximum of ${process.env.MATCH_RANGE_LIMIT} months`
    );

  return true;
};
