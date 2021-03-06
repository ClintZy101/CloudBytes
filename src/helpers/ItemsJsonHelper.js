import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import v from "voca";
import tarlac from "assets/json_files/inventory_tarlac.json";
import talavera from "assets/json_files/inventory_talavera.json";
import rosales from "assets/json_files/inventory_rosales.json";

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

function getDetails(data) {
  const itemName = data.Item.slice(
    data.Item.indexOf(":") + 1,
    data.Item.length
  );
  const category = data.Item.slice(0, data.Item.indexOf(":"));
  return {
    item_name: v.upperCase(itemName),
    description: v.upperCase(data.Description),
    category: v.titleCase(category)
  };
}

const parseToNum = num => Number(num.toString().replace(/[^0-9.-]+/g, ""));
const markup = (price, cost) => ((price - cost) / cost) * 100;
const interest = (price, cost) => price - cost;

const getCost = data => round(parseToNum(data.Cost));
const getPrice = data => round(parseToNum(data.Price));
const getBranchCost = data => round(data.BranchCost);
const getMarkup = data =>
  round(markup(parseToNum(data.Price), parseToNum(data.Cost)));
const getBranchMarkup = data =>
  round(markup(parseToNum(data.Price), data.BranchCost));
const getInterest = data =>
  round(interest(parseToNum(data.Price), parseToNum(data.Cost)));
const getBranchInterest = data =>
  round(interest(parseToNum(data.Price), data.BranchCost));
const getCostDiff = data => round(data.BranchCost - parseToNum(data.Cost));
const getMarkupDiff = data => {
  const mainMarkup = markup(parseToNum(data.Price), parseToNum(data.Cost));
  const branchMarkup = markup(parseToNum(data.Price), data.BranchCost);
  return round(mainMarkup - branchMarkup);
};
const getInterestDiff = data => {
  const mainInterest = interest(parseToNum(data.Price), parseToNum(data.Cost));
  const branchInterest = interest(parseToNum(data.Price), data.BranchCost);
  return round(mainInterest - branchInterest);
};

export function getItems(storeType) {
  const items = [];
  if (storeType === "Tarlac") {
    _.forEach(tarlac, data => {
      items.push({
        id: uuidv4(),
        available_items: data.Quantity,
        details: getDetails(data),
        price: getPrice(data),
        cost: getCost(data),
        markup: getMarkup(data),
        interest: getInterest(data),
        pricing: {
          price: getPrice(data),
          main_cost: getCost(data),
          branch_cost: getBranchCost(data),
          main_markup: getMarkup(data),
          branch_markup: getBranchMarkup(data),
          main_interest: getInterest(data),
          branch_interest: getBranchInterest(data)
        },
        difference: {
          cost: getCostDiff(data),
          markup: getMarkupDiff(data),
          interest: getInterestDiff(data)
        }
      });
    });
  } else {
    let inv_items = null;
    if (storeType === "Rosales") inv_items = rosales;
    if (storeType === "Talavera") inv_items = talavera;
    if (inv_items !== null) {
      inv_items.forEach(data => {
        items.push({
          id: uuidv4(),
          available_items: data.Quantity,
          details: getDetails(data),
          price: getPrice(data),
          cost: getCost(data),
          markup: getMarkup(data),
          interest: getInterest(data)
        });
      });
    }
  }

  return items;
}
