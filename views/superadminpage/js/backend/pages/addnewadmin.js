let addnewadminvar;
function Addnewadmin() {
  let adminid;
  let errortimeout1 = 0,
    errortimeout2 = 0,
    errortimeout3 = 0,
    errortimeout4 = 0,
    errortimeout5 = 0,
    errortimeout6 = 0,
    errortimeout7 = 0,
    errortimeout8 = 0,
    errortimeout9 = 0;
  let adminmodulevar = [],
    admincurriculummodule = [];
  async function getnewpassword() {
    try {
      let response = await fetch(
        "/api/users/superadmin/addnewadmin/getnewpassword",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success") {
        document.getElementById("addadminpasswordtext").value =
          myresult.password;
      }
      errortimeout1 = 0;
    } catch (error) {
      errortimeout1 += 1;
      if (errortimeout1 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout1 = 0;
        setTimeout(getnewpassword, 1000);
      }
    }
  }
  async function displayall() {
    try {
      let response = await fetch("/api/users/superadmin/addnewadmin", {
        method: "GET",
      });
      let myresult = await response.json();
      let output = "";
      let value = document.getElementById(
        "table_tbodytmplt_addadmin"
      ).innerHTML;
      if (myresult.status == "success") {
        for (let i in myresult.allresults) {
          output += eval("`" + value.toString() + "`");
        }
        document.getElementById("table_tbody_addadmin").innerHTML = output;
      } else {
        alert("Error");
      }
      errortimeout2 = 0;
    } catch (error) {
      errortimeout2 += 1;
      if (errortimeout2 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout2 = 0;
        setTimeout(displayall, 1000);
      }
    }
  }

  async function getspecificadmin(id) {
    adminid = id.firstElementChild.innerHTML;
    try {
      let response = await fetch(
        `/api/users/superadmin/addnewadmin/displayspecificadmin/${adminid}`,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success") {
        document.getElementById("addadminusernametext").value =
          myresult.username;
        document.getElementById("addadminlastnametext").value =
          myresult.lastname;
        document.getElementById("addadminfirstnametext").value =
          myresult.firstname;
        document.getElementById("addadminemailtext").value = myresult.email;
        displaymodule(myresult.modules, myresult.positions);
      }
      errortimeout6 = 0;
    } catch (error) {
      errortimeout6 += 1;
      if (errortimeout6 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout6 = 0;
        setTimeout(getspecificadmin, 1000);
      }
    }
  }

  async function displaymodule(modules, positions) {
    let addstaff,
      audittrail,
      managestudent,
      curriculum,
      manageuseraccess,
      registrar,
      accounting,
      cashier,
      enlistment,
      reports,
      logyearspan;

    let displaymodulevar = document.getElementById(
      "addadmindisplaymoduleid"
    ).innerHTML;

    if (modules.find((x) => x == "addstaff") != undefined) {
      addstaff = "&check;";
    } else {
      addstaff = "&times;";
    }

    if (modules.find((x) => x == "audittrail") != undefined) {
      audittrail = "&check;";
    } else {
      audittrail = "&times;";
    }

    if (modules.find((x) => x == "managestudent") != undefined) {
      managestudent = "&check;";
    } else {
      managestudent = "&times;";
    }

    if (modules.find((x) => x == "curriculum") != undefined) {
      curriculum = "&check;";
    } else {
      curriculum = "&times;";
    }

    if (modules.find((x) => x == "manageuseraccess") != undefined) {
      manageuseraccess = "&check;";
    } else {
      manageuseraccess = "&times;";
    }

    if (positions.find((x) => x == "registrar") != undefined) {
      registrar = "&check;";
    } else {
      registrar = "&times;";
    }

    if (positions.find((x) => x == "accounting") != undefined) {
      accounting = "&check;";
    } else {
      accounting = "&times;";
    }

    if (positions.find((x) => x == "cashier") != undefined) {
      cashier = "&check;";
    } else {
      cashier = "&times;";
    }

    if (positions.find((x) => x == "enlistment") != undefined) {
      enlistment = "&check;";
    } else {
      enlistment = "&times;";
    }

    if (modules.find((x) => x == "reports") != undefined) {
      reports = "&check;";
    } else {
      reports = "&times;";
    }

    if (modules.find((x) => x == "logyearspan") != undefined) {
      logyearspan = "&check;";
    } else {
      logyearspan = "&times;";
    }

    let output = eval("`" + displaymodulevar.toString() + "`");
    document.getElementById("addadmindisplaymoduleid").innerHTML = output;
  }

  async function displayallcurriculum() {
    try {
      let response = await fetch(
        "/api/users/superadmin/addnewadmin/getallcurriculum",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success" && myresult.schoollevel != "empty") {
        let text = "";
        for (let x in myresult.schoollevel) {
          text += "<option>" + myresult.schoollevel[x].schoollvl + "</option>";
        }
        document.getElementById("addadminschoollevel").innerHTML = text;
      } else {
        document.getElementById("addadminschoollevel").innerHTML = "";
      }

      if (myresult.status == "success" && myresult.yearlevel != "empty") {
        let text = "";
        for (let x in myresult.yearlevel) {
          text += "<option>" + myresult.yearlevel[x].yearlvl + "</option>";
        }
        document.getElementById("addadminyearlevel").innerHTML = text;
      } else {
        document.getElementById("addadminyearlevel").innerHTML = "";
      }

      if (myresult.status == "success" && myresult.section != "empty") {
        let text = "";
        for (let x in myresult.section) {
          text += "<option>" + myresult.section[x].section + "</option>";
        }
        document.getElementById("addadminsection").innerHTML = text;
      } else {
        document.getElementById("addadminsection").innerHTML = "";
      }
      errortimeout7 = 0;
    } catch (error) {
      errortimeout7 += 1;
      if (errortimeout7 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout7 = 0;
        setTimeout(displayallcurriculum, 1000);
      }
    }
  }

  async function displayspecificyearlevel() {
    try {
      let getdata = {
        schoollevel: document.getElementById("addadminschoollevel").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/addnewadmin/getallspecificcurriculum",
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
        document.getElementById("addadminyearlevel").innerHTML = text;
        displayspecificsection();
      } else {
        document.getElementById("addadminyearlevel").innerHTML = "";
        displayspecificsection();
      }
      errortimeout8 = 0;
    } catch (error) {
      errortimeout8 += 1;
      if (errortimeout8 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout8 = 0;
        setTimeout(displayspecificyearlevel, 1000);
      }
    }
  }

  async function displayspecificsection() {
    try {
      let getdata = {
        schoollevel: document.getElementById("addadminschoollevel").value,
        yearlevel: document.getElementById("addadminyearlevel").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/addnewadmin/getallspecificcurriculum",
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
        document.getElementById("addadminsection").innerHTML = text;
      } else {
        document.getElementById("addadminsection").innerHTML = "";
      }
      errortimeout9 = 0;
    } catch (error) {
      errortimeout9 += 1;
      if (errortimeout9 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout9 = 0;
        setTimeout(displayspecificsection, 1000);
      }
    }
  }

  async function loadmodule() {
    adminmodulevar = [];
    admincurriculummodule = [];
    let list = document.getElementById("addadminmodalmoduledivlist");
    let items = list.getElementsByTagName("div");
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let checkboxelem = item.getElementsByTagName("label")[0];
      if (checkboxelem) {
        let checkboxid = checkboxelem.getAttribute("for");
        adminmodulevar.push(document.getElementById(checkboxid).checked);
      }
      let dropdownelem = item.getElementsByTagName("select")[0];
      if (dropdownelem) {
        let dropdownid = dropdownelem.getAttribute("id");
        admincurriculummodule.push(document.getElementById(dropdownid).value);
      }
    }
    alert("admin module saved");
  }

  ///////////// for getting profile pic ///////////
  var loadFile = function (event) {
    var output = document.getElementById("addadminprofileimage");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  function uploadprofilepic() {
    document.getElementById("addadminpicture").click();
  }
  /////////////////////////////////////////////////

  /////////////////////// for crud ///////////////////////////
  async function addnew() {
    let profileimg = document.getElementById("addadminpicture");
    let username = document.getElementById("addadminusernametext").value;
    let password = document.getElementById("addadminpasswordtext").value;
    let lastname = document.getElementById("addadminlastnametext").value;
    let firstname = document.getElementById("addadminfirstnametext").value;
    let email = document.getElementById("addadminemailtext").value;
    try {
      let formData = new FormData();
      formData.append("profilepic", profileimg.files[0]);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("email", email);
      //////////////// admin modules /////////////////
      formData.append("adminmodule", adminmodulevar);
      formData.append("admincurriculum", admincurriculummodule);
      ////////////////////////////////////////////////
      const response = await axios.post(
        "/api/users/superadmin/addnewadmin/manageadminaccount/insertprofile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status == "success") {
        alert("Profile Added Successfully");
        displayall();
      }
      errortimeout3 = 0;
    } catch (error) {
      errortimeout3 += 1;
      if (errortimeout3 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout3 = 0;
        setTimeout(addnew, 1000);
      }
    }
  }

  async function update() {
    let profileimg = document.getElementById("addadminpicture");
    let username = document.getElementById("addadminusernametext").value;
    let password = document.getElementById("addadminpasswordtext").value;
    let lastname = document.getElementById("addadminlastnametext").value;
    let firstname = document.getElementById("addadminfirstnametext").value;
    let email = document.getElementById("addadminemailtext").value;
    try {
      let formData = new FormData();
      formData.append("profilepic", profileimg.files[0]);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("email", email);
      //////////////// admin modules /////////////////
      formData.append("adminmodule", adminmodulevar);
      formData.append("admincurriculum", admincurriculummodule);
      ////////////////////////////////////////////////
      const response = await axios.post(
        `/api/users/superadmin/addnewadmin/manageadminaccount/updateprofile/${adminid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status == "success") {
        alert("Profile Updated Successfully");
        displayall();
      }
      errortimeout4 = 0;
    } catch (error) {
      errortimeout4 += 1;
      if (errortimeout4 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout4 = 0;
        setTimeout(update, 1000);
      }
    }
  }

  async function deletenow() {
    try {
      let response = await fetch(
        `/api/users/superadmin/addnewadmin/manageadminaccount/deleteprofile/${adminid}`,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success") {
        alert("Profile Deleted Successfully");
        displayall();
      }
      errortimeout5 = 0;
    } catch (error) {
      errortimeout5 += 1;
      if (errortimeout5 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout5 = 0;
        setTimeout(deletenow, 1000);
      }
    }
  }
  //////////////////////////////////////////////////////////

  return {
    getnewpassword,
    displayall,
    displaymodule,
    displayallcurriculum,
    displayspecificyearlevel,
    displayspecificsection,
    addnew,
    update,
    deletenow,
    loadmodule,
    loadFile,
    getspecificadmin,
    uploadprofilepic,
  };
}

addnewadminvar = Addnewadmin();
