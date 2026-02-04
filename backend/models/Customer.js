import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customername: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    companyname: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
