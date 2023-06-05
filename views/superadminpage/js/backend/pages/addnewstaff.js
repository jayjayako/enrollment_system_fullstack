let addnewstaffvar;
function Addnewstaff() {
  let staffid;
  let errortimeout1 = 0,
    errortimeout2 = 0,
    errortimeout3 = 0,
    errortimeout4 = 0,
    errortimeout5 = 0,
    errortimeout6 = 0,
    errortimeout7 = 0,
    errortimeout8 = 0,
    errortimeout9 = 0;
  let staffmodulevar = [],
    staffcurriculummodule = [];
  async function getnewpassword() {
    try {
      let response = await fetch(
        "/api/users/superadmin/addnewstaff/getnewpassword",
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success") {
        document.getElementById("addstaffpasswordtext").value =
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
      let response = await fetch("/api/users/superadmin/addnewstaff", {
        method: "GET",
      });
      let myresult = await response.json();
      let output = "";
      let value = document.getElementById(
        "table_tbodytmplt_addstaff"
      ).innerHTML;
      if (myresult.status == "success") {
        for (let i in myresult.allresults) {
          output += eval("`" + value.toString() + "`");
        }
        document.getElementById("table_tbody_addstaff").innerHTML = output;
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

  async function getspecificstaff(id) {
    staffid = id.firstElementChild.innerHTML;
    try {
      let response = await fetch(
        `/api/users/superadmin/addnewstaff/displayspecificstaff/${staffid}`,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success") {
        document.getElementById("addstaffusernametext").value =
          myresult.username;
        document.getElementById("addstafflastnametext").value =
          myresult.lastname;
        document.getElementById("addstafffirstnametext").value =
          myresult.firstname;
        document.getElementById("addstaffemailtext").value = myresult.email;
        displaymodule(myresult.modules, myresult.positions);
      }
      errortimeout3 = 0;
    } catch (error) {
      errortimeout3 += 1;
      if (errortimeout3 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout3 = 0;
        setTimeout(getspecificstaff, 1000);
      }
    }
  }

  async function displaymodule(modules, positions) {
    let audittrail,
      managestudent,
      reports,
      allpositions = "";

    let displaymodulevar = document.getElementById(
      "addstaffdisplaymoduleid"
    ).innerHTML;
    let displayposition = document.getElementById(
      "addstaffdisplaymodulepositionid"
    ).innerHTML;

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

    if (positions.find((x) => x == "registrar") != undefined) {
      allpositions += "Registrar--";
    }

    if (positions.find((x) => x == "accounting") != undefined) {
      allpositions += "Accounting--";
    }

    if (positions.find((x) => x == "cashier") != undefined) {
      allpositions += "Cashier--";
    }

    if (positions.find((x) => x == "enlistment") != undefined) {
      allpositions += "Enlistment--";
    }

    if (modules.find((x) => x == "reports") != undefined) {
      reports = "&check;";
    } else {
      reports = "&times;";
    }

    let output = eval("`" + displaymodulevar.toString() + "`");
    let output2 = eval("`" + displayposition.toString() + "`");
    document.getElementById("addstaffdisplaymoduleid").innerHTML = output;
    document.getElementById("addstaffdisplaymodulepositionid").innerHTML =
      output2;
  }

  async function displayallcurriculum() {
    try {
      let response = await fetch(
        "/api/users/superadmin/addnewstaff/getallcurriculum",
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
        document.getElementById("addstaffschoollevel").innerHTML = text;
      } else {
        document.getElementById("addstaffschoollevel").innerHTML = "";
      }

      if (myresult.status == "success" && myresult.yearlevel != "empty") {
        let text = "";
        for (let x in myresult.yearlevel) {
          text += "<option>" + myresult.yearlevel[x].yearlvl + "</option>";
        }
        document.getElementById("addstaffyearlevel").innerHTML = text;
      } else {
        document.getElementById("addstaffyearlevel").innerHTML = "";
      }

      if (myresult.status == "success" && myresult.section != "empty") {
        let text = "";
        for (let x in myresult.section) {
          text += "<option>" + myresult.section[x].section + "</option>";
        }
        document.getElementById("addstaffsection").innerHTML = text;
      } else {
        document.getElementById("addstaffsection").innerHTML = "";
      }
      errortimeout4 = 0;
    } catch (error) {
      errortimeout4 += 1;
      if (errortimeout4 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout4 = 0;
        setTimeout(displayallcurriculum, 1000);
      }
    }
  }

  async function displayspecificyearlevel() {
    try {
      let getdata = {
        schoollevel: document.getElementById("addstaffschoollevel").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/addnewstaff/getallspecificcurriculum",
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
        document.getElementById("addstaffyearlevel").innerHTML = text;
        displayspecificsection();
      } else {
        document.getElementById("addstaffyearlevel").innerHTML = "";
        displayspecificsection();
      }
      errortimeout5 = 0;
    } catch (error) {
      errortimeout5 += 1;
      if (errortimeout5 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout5 = 0;
        setTimeout(displayspecificyearlevel, 1000);
      }
    }
  }

  async function displayspecificsection() {
    try {
      let getdata = {
        schoollevel: document.getElementById("addstaffschoollevel").value,
        yearlevel: document.getElementById("addstaffyearlevel").value,
      };
      const response = await axios.post(
        "/api/users/superadmin/addnewstaff/getallspecificcurriculum",
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
        document.getElementById("addstaffsection").innerHTML = text;
      } else {
        document.getElementById("addstaffsection").innerHTML = "";
      }
      errortimeout6 = 0;
    } catch (error) {
      errortimeout6 += 1;
      if (errortimeout6 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout6 = 0;
        setTimeout(displayspecificsection, 1000);
      }
    }
  }

  async function loadmodule() {
    staffmodulevar = [];
    staffcurriculummodule = [];
    let list = document.getElementById("addstaffmodalmodulepositiondivlist");
    let list2 = document.getElementById("addstaffmodalmoduleotherdivlist");
    let items = list.getElementsByTagName("div");
    let items2 = list2.getElementsByTagName("div");
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let checkboxelem = item.getElementsByTagName("label")[0];
      if (checkboxelem) {
        let checkboxid = checkboxelem.getAttribute("for");
        staffmodulevar.push(document.getElementById(checkboxid).checked);
      }
    }
    for (let i = 0; i < items2.length; i++) {
      let item = items2[i];
      let checkboxelem = item.getElementsByTagName("label")[0];
      if (checkboxelem) {
        let checkboxid = checkboxelem.getAttribute("for");
        staffmodulevar.push(document.getElementById(checkboxid).checked);
      }
      let dropdownelem = item.getElementsByTagName("select")[0];
      if (dropdownelem) {
        let dropdownid = dropdownelem.getAttribute("id");
        staffcurriculummodule.push(document.getElementById(dropdownid).value);
      }
    }
    alert("staff module saved");
  }

  ///////////// for getting profile pic ///////////
  var loadFile = function (event) {
    var output = document.getElementById("addstaffprofileimage");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  function uploadprofilepic() {
    document.getElementById("addstaffpicture").click();
  }
  /////////////////////////////////////////////////

  /////////////////////// for crud ///////////////////////////
  async function addnew() {
    let profileimg = document.getElementById("addstaffpicture");
    let username = document.getElementById("addstaffusernametext").value;
    let password = document.getElementById("addstaffpasswordtext").value;
    let lastname = document.getElementById("addstafflastnametext").value;
    let firstname = document.getElementById("addstafffirstnametext").value;
    let email = document.getElementById("addstaffemailtext").value;
    try {
      let formData = new FormData();
      formData.append("profilepic", profileimg.files[0]);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("email", email);
      //////////////// admin modules /////////////////
      formData.append("staffmodule", staffmodulevar);
      formData.append("staffcurriculum", staffcurriculummodule);
      ////////////////////////////////////////////////
      const response = await axios.post(
        "/api/users/superadmin/addnewstaff/managestaffaccount/insertprofile",
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
      errortimeout7 = 0;
    } catch (error) {
      errortimeout7 += 1;
      if (errortimeout7 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout7 = 0;
        setTimeout(addnew, 1000);
      }
    }
  }

  async function update() {
    let profileimg = document.getElementById("addstaffpicture");
    let username = document.getElementById("addstaffusernametext").value;
    let password = document.getElementById("addstaffpasswordtext").value;
    let lastname = document.getElementById("addstafflastnametext").value;
    let firstname = document.getElementById("addstafffirstnametext").value;
    let email = document.getElementById("addstaffemailtext").value;
    try {
      let formData = new FormData();
      formData.append("profilepic", profileimg.files[0]);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("email", email);
      //////////////// admin modules /////////////////
      formData.append("staffmodule", staffmodulevar);
      formData.append("staffcurriculum", staffcurriculummodule);
      ////////////////////////////////////////////////
      const response = await axios.post(
        `/api/users/superadmin/addnewstaff/managestaffaccount/updateprofile/${staffid}`,
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
      errortimeout8 = 0;
    } catch (error) {
      errortimeout8 += 1;
      if (errortimeout8 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout8 = 0;
        setTimeout(update, 1000);
      }
    }
  }

  async function deletenow() {
    try {
      let response = await fetch(
        `/api/users/superadmin/addnewstaff/managestaffaccount/deleteprofile/${staffid}`,
        {
          method: "GET",
        }
      );
      let myresult = await response.json();
      if (myresult.status == "success") {
        alert("Profile Deleted Successfully");
        displayall();
      }
      errortimeout9 = 0;
    } catch (error) {
      errortimeout9 += 1;
      if (errortimeout9 >= 5) {
        alert("Opps Network Error!");
      } else {
        errortimeout9 = 0;
        setTimeout(deletenow, 1000);
      }
    }
  }
  //////////////////////////////////////////////////////////

  return {
    getnewpassword,
    displayall,
    getspecificstaff,
    displaymodule,
    displayallcurriculum,
    displayspecificyearlevel,
    displayspecificsection,
    loadmodule,
    loadFile,
    uploadprofilepic,
    addnew,
    update,
    deletenow,
  };
}

addnewstaffvar = Addnewstaff();
