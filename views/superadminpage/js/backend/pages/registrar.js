let registrarvar;
function Registrar() {
  let errortimeout1 = 0,
    errortimeout2 = 0,
    errortimeout3 = 0,
    errortimeout4 = 0,
    errortimeout5 = 0;
  async function displayschedule() {
    try {
      let response = await fetch(
        "/api/users/superadmin/registrar/getenrollmentsched",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      document.getElementById("fromyearenrollmentsched").value =
        myresult.fromyear;

      let results = "";
      for (let i in myresult.allmonth) {
        results += `<option>${myresult.allmonth[i]}</option>`;
      }
      document.getElementById("frommonthenrollmentsched").innerHTML = results;
      document.getElementById("frommonthenrollmentsched").value =
        myresult.frommonth;
      document.getElementById("fromdayenrollmentsched").value =
        myresult.fromday;
      document.getElementById("fromhourenrollmentsched").value =
        myresult.fromhour;
      document.getElementById("fromminuteenrollmentsched").value =
        myresult.fromminute;
      document.getElementById("toyearenrollmentsched").value = myresult.toyear;
      results = "";
      for (let i in myresult.allmonth) {
        results += `<option>${myresult.allmonth[i]}</option>`;
      }
      document.getElementById("tomonthenrollmentsched").innerHTML = results;
      document.getElementById("tomonthenrollmentsched").value =
        myresult.tomonth;
      document.getElementById("todayenrollmentsched").value = myresult.today;
      document.getElementById("tohourenrollmentsched").value = myresult.tohour;
      document.getElementById("tominuteenrollmentsched").value =
        myresult.tominute;
      errortimeout1 = 0;
    } catch (error) {
      errortimeout1 += 1;
      if (errortimeout1 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout1 = 0;
        setTimeout(displayschedule, 1000);
      }
    }
  }

  async function updateschedule() {
    try {
      let getdata = {
        fromyear: document.getElementById("fromyearenrollmentsched").value,
        frommonth: document.getElementById("frommonthenrollmentsched").value,
        fromday: document.getElementById("fromdayenrollmentsched").value,
        fromhour: document.getElementById("fromhourenrollmentsched").value,
        fromminute: document.getElementById("fromminuteenrollmentsched").value,
        toyear: document.getElementById("toyearenrollmentsched").value,
        tomonth: document.getElementById("tomonthenrollmentsched").value,
        today: document.getElementById("todayenrollmentsched").value,
        tohour: document.getElementById("tohourenrollmentsched").value,
        tominute: document.getElementById("tominuteenrollmentsched").value,
      };
      const response = await axios.post(
        `/api/users/superadmin/registrar/updateenrollmentsched`,
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == "success") {
        alert("Schedule Updated Successfully");
        displayschedule();
      }
      errortimeout2 = 0;
    } catch (error) {
      errortimeout2 += 1;
      if (errortimeout2 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout2 = 0;
        setTimeout(updateschedule, 1000);
      }
    }
  }

  async function getschoolmodule() {
    try {
      let response = await fetch(
        "/api/users/superadmin/registrar/getallcurriculum",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      let results = "";
      for (let i in myresult.schoollevel) {
        results += `<option>${myresult.schoollevel[i].schoollvl}</option>`;
      }
      document.getElementById("editenrolleeschoollevel").innerHTML = results;
      results = "";
      for (let i in myresult.yearlevel) {
        results += `<option>${myresult.yearlevel[i].yearlvl}</option>`;
      }
      document.getElementById("editenrolleeyearlevel").innerHTML = results;
      results = "";
      for (let i in myresult.section) {
        results += `<option>${myresult.section[i].section}</option>`;
      }
      document.getElementById("editenrolleesection").innerHTML = results;
      errortimeout3 = 0;
    } catch (error) {
      errortimeout3 += 1;
      if (errortimeout3 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout3 = 0;
        setTimeout(getschoolmodule, 1000);
      }
    }
  }

  async function displayspecificyearlevel() {
    try {
      let getdata = {
        schoollevel: document.getElementById("editenrolleeschoollevel").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/registrar/getallspecificcurriculum",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data.status == "success" &&
        response.data.yearlevel != "empty"
      ) {
        let text = "";
        for (let x in response.data.yearlevel) {
          text += "<option>" + response.data.yearlevel[x].yearlvl + "</option>";
        }
        document.getElementById("editenrolleeyearlevel").innerHTML = text;
        displayspecificsection();
      } else {
        document.getElementById("editenrolleeyearlevel").innerHTML = "";
        displayspecificsection();
      }
      errortimeout4 = 0;
    } catch (error) {
      errortimeout4 += 1;
      if (errortimeout4 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout4 = 0;
        setTimeout(displayspecificyearlevel, 1000);
      }
    }
  }

  async function displayspecificsection() {
    try {
      let getdata = {
        schoollevel: document.getElementById("editenrolleeschoollevel").value,
        yearlevel: document.getElementById("editenrolleeyearlevel").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/registrar/getallspecificcurriculum",
        getdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data.status == "success" &&
        response.data.section != "empty"
      ) {
        let text = "";
        for (let x in response.data.section) {
          text += "<option>" + response.data.section[x].section + "</option>";
        }
        document.getElementById("editenrolleesection").innerHTML = text;
      } else {
        document.getElementById("editenrolleesection").innerHTML = "";
      }
      errortimeout5 = 0;
    } catch (error) {
      errortimeout5 += 1;
      if (errortimeout5 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout5 = 0;
        setTimeout(displayspecificsection, 1000);
      }
    }
  }

  return {
    displayschedule,
    updateschedule,
    getschoolmodule,
    displayspecificyearlevel,
    displayspecificsection,
  };
}

registrarvar = Registrar();
