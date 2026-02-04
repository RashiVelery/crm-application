import Customer from "../models/Customer.js";

export const createCustomer = async (req, res) => {
  const customer = await Customer.create({
    ...req.body,
    user: req.user.id
  });
  res.status(201).json(customer);
};

export const getCustomers = async (req, res) => {
  const customers = await Customer.find({ user: req.user.id });
  res.json(customers);
};

export const updateCustomer = async (req, res) => {
  const customer = await Customer.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json(customer);
};

export const deleteCustomer = async (req, res) => {
  const customer = await Customer.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer deleted" });
};
