
interface SignInInterface {
  email: string;
  password: string;
}

interface SignUpInterface extends SignInInterface {
  name: string;
}


// ---------- Signup ----------
export const signup = async (data: SignUpInterface) => {
  const response = await fetch(`https://doctor-oppointment-booking.onrender.com/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Signup failed: ${response.statusText}`);
  }

  const res = await response.json();
  return res;
};

// ---------- Signin ----------
export const signin = async (data: SignInInterface) => {
  const response = await fetch(`https://doctor-oppointment-booking.onrender.com/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Signin failed: ${response.statusText}`);
  }

  const res = await response.json();
  return res;
};
