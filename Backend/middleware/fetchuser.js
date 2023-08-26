import jwt from "jsonwebtoken";

function fetchuser(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      message: "Please login to visit this page"
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data;
  } catch (error) {
    res.status(401).json({
      message: "Please login to visit this page"
    })
  }
  next();
}

export default fetchuser;