import inventory from "assets/inventory_v2.json";
import priceLevel from "src/helpers/PriceLevel.js";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import v from "voca";

const items = inventory.Items;
const formattedItems = [];

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

_.forEach(items, data => {
  // add the category to item
  const item = data.Item;
  data.Category = item.slice(0, item.indexOf(":"));

  // add the item name
  data.ItemName = item.slice(item.indexOf(":") + 1, item.length);

  // delete the item object
  delete data.Item;

  // format item name, category and description
  data.ItemName = v.upperCase(data.ItemName);
  data.Description = v.upperCase(data.Description);
  data.Category = v.titleCase(data.Category);

  // convert to number
  data.Cost = round(Number(data.Cost.replace(/[^0-9.-]+/g, "")));
  data.Price = round(Number(data.Price.replace(/[^0-9.-]+/g, "")));
  data.BranchCost = round(data.BranchCost);

  // computation
  data.Markup = round((data.Price - data.Cost) / data.Cost);
  data.BranchMarkup = round((data.Price - data.BranchCost) / data.BranchCost);
  // data.BranchCostMarkup = round((data.BranchCost - data.Cost) / data.Cost);
  // data.BranchMarkup = data.Markup;
  // data.BranchPrice = round(data.Markup * data.BranchCost + data.BranchCost);
  data.Interest = round(data.Price - data.Cost);
  data.BranchInterest = round(data.Price - data.BranchCost);
  data.CostDiff = round(data.BranchCost - data.Cost);
  data.InterestDiff = round(data.Interest - data.BranchInterest);

  // price level
  data.PriceLevel = _.find(priceLevel, x => {
    return data.Cost >= x.min && data.Cost <= x.max;
  });

  // data.NewPrice = round(data.PriceLevel.markup * data.Cost + data.Cost);
  // data.NewPriceMainInterest = round(data.NewPrice - data.Cost);
  // data.NewPriceBranchInterest = round(data.NewPrice - data.BranchCost);
  // data.NewPriceMainDiff = round(data.NewPrice - data.Price);
  // data.NewPriceBranchDiff = round(data.NewPrice - data.BranchPrice);

  formattedItems.push({
    id: uuidv4(),
    details: {
      category: data.Category,
      itemName: data.ItemName,
      description: data.Description
    },
    // oldPricing: {
    //   main: {
    //     cost: data.Cost,
    //     price: data.Price,
    //     markup: data.Markup,
    //     interest: data.MainInterest
    //   },
    //   branch: {
    //     costMarkup: data.BranchCostMarkup,
    //     cost: data.BranchCost,
    //     markup: data.BranchMarkup,
    //     price: data.BranchPrice,
    //     interest: data.BranchInterest
    //   }
    // },
    pricing: {
      price: data.Price,

      main_cost: data.Cost,
      branch_cost: data.BranchCost,
      main_markup: data.Markup,
      branch_markup: data.BranchMarkup,
      main_interest: data.Interest,
      branch_interest: data.BranchInterest

      // min: data.PriceLevel.min,
      // max: data.PriceLevel.max,
      // markup: data.PriceLevel.markup,
      // price: data.NewPrice,
      // main: {
      //   interest: data.NewPriceMainInterest,
      //   difference: data.NewPriceMainDiff
      // },
      // branch: {
      //   interest: data.NewPriceBranchInterest,
      //   difference: data.NewPriceBranchDiff
      // }
    },
    difference: {
      cost: data.CostDiff,
      interest: data.InterestDiff
    }
  });
});

export default formattedItems;
