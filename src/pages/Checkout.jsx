import { useState } from "react";
import "./Checkout.css";

function Checkout() {

  // ✅ 1. STATE (always at top)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  // ✅ 2. HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ 3. VALIDATION FUNCTION
  const validate = () => {
    let errs = {};

    if (!form.name) errs.name = "Name is required";
    if (!form.email.includes("@")) errs.email = "Invalid email";
    if (form.phone.length !== 10) errs.phone = "Enter 10-digit phone";
    if (!form.address) errs.address = "Address required";
    if (!form.city) errs.city = "City required";
    if (form.pincode.length !== 6) errs.pincode = "Invalid pincode";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ✅ 4. SUBMIT
  const handleSubmit = () => {
    if (validate()) {
      alert("Proceeding to payment...");
    }
  };

  // ✅ 5. RETURN (ALL JSX MUST BE HERE)
  return (
    <div>

      {/* 🔷 Steps */}
      <div className="steps">
        <span className="active">Delivery</span>
        <span>Payment</span>
        <span>Confirm</span>
      </div>

      {/* 🔷 Form */}
      <div className="form">

        <div className="row">
          <div>
            <input name="name" placeholder="Name" onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <input name="email" placeholder="Email" onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>

        <div>
          <input name="phone" type="tel" placeholder="Phone" onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div>
          <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="row">
          <div>
            <input name="city" placeholder="City" onChange={handleChange} />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          <div>
            <input
              name="pincode"
              placeholder="Pincode"
              maxLength="6"
              onChange={handleChange}
            />
            {errors.pincode && <p className="error">{errors.pincode}</p>}
          </div>
        </div>

        <button onClick={handleSubmit}>
          Continue to Payment
        </button>

      </div>

    </div>
  );
}

export default Checkout;
