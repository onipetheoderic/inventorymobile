type validatorField = {
  name: string;
  unit_price: number;
  quantity: number;
  category: string;
  description: string;
};
export const CreateValidator = (fields: validatorField, itemNames: any[]) => {
  let { name, unit_price, quantity, category, description } = fields;
  console.log(itemNames, "validator");
  if (name.length < 1) {
    return { success: false, message: "name is required" };
  }
  if (itemNames.includes(name) === true) {
    return {
      success: false,
      message: "name is already present in the inventory, use another name",
    };
  }
  if (unit_price.toString().length < 1) {
    return { success: false, message: "unit price must be present" };
  }
  if (quantity.toString().length < 1) {
    return { success: false, message: "quantity must be present" };
  }
  if (description.length < 3) {
    return {
      success: false,
      message: "description must be more than 3 characters",
    };
  }
  if (category.length < 1) {
    return { success: false, message: "category must be present" };
  } else {
    return { success: true };
  }
};

export const EditValidator = (fields: validatorField) => {
  let { name, unit_price, quantity, description } = fields;
  if (name.length < 1) {
    return { success: false, message: "name is required" };
  }
  if (unit_price.toString().length < 1) {
    return { success: false, message: "unit price must be present" };
  }
  if (quantity.toString().length < 1) {
    return { success: false, message: "quantity must be present" };
  }
  if (description.length < 3) {
    return {
      success: false,
      message: "description must be more than 3 characters",
    };
  } else {
    return { success: true };
  }
};
