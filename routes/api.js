var express = require("express");
var router = express.Router();
const maria = require("../config/maria");

router.get("/results", (req, res) => {
  maria.query(`SELECT * FROM Result`, function (err, result) {
    if (!err) {
      console.log("Results Sent");
      res.send(result);
    } else {
      console.log("ERR : " + err);
      res.status(404).json({
        error: "Error",
      });
    }
  });
});

router.post("/result/save", function (req, res) {
  var age = ""; // ex: 20대
  var sex = ""; // ex: 여성
  var img_name = ""; // ex:
  var transport_score = null; // ex: 4
  var crime_score = null; // ex: 3

  try {
    age = req.body.age;
    sex = req.body.sex;
    img_name = req.body.img_name;
    transport_score = req.body?.transport_score;
    crime_score = req.body?.crime_score;
  } catch (e) {
    console.log("ERR (get request) : " + e);
    res.status(400).json({
      error: "ERR_PARAMS : parameter error",
    });
  }

  maria.query(
    `INSERT INTO Result(age, sex, img_name, transport_score, crime_score) VALUES ("${age}","${sex}", "${img_name}", ${transport_score}, ${crime_score} )`,
    function (err) {
      if (!err) {
        console.log("result saved");
        res.status(200).json({
          message: "Result is saved",
        });
      } else {
        console.log("ERR: Saving Result" + err);
        res.status(409).json({
          error: "body 형식이 틀리거나 데이터베이스에 문제가 발생했습니다.",
        });
      }
    }
  );
});

module.exports = router;
