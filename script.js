function sendData() {
  var username = document.getElementById('username').value
  var password = document.getElementById('password').value
  var result = document.getElementById('result')

  var xhr = new XMLHttpRequest()
  var url =
    'https://lgcgatewayapi-stage.azurewebsites.net/api/Authorization/authenticate'

  xhr.open('POST', url, true)

  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var serverResponse = JSON.parse(this.responseText)
      result.innerHTML = ' Logged In Successfully ! '
      var auth = serverResponse.data.token
      localStorage.setItem('token', auth)
      console.log(auth)

      window.location.href = 'displaypage.html'
      // retrieveData()
    }

    if (xhr.readyState == 4 && xhr.status == 400) {
      result.innerHTML = ' Invalid Login Credentials ! '
    }
  }

  var data = JSON.stringify({ username: username, password: password })

  xhr.send(data)
}

function retrieveData() {
  var result = document.getElementById('applicantResult')
  result.innerHTML = ''

  var getData = new XMLHttpRequest()
  var url2 =
    'https://lgcgatewayapi-stage.azurewebsites.net/api/applicant/getApplicantList'

  var token = localStorage.getItem('token')

  document.getElementById('datatab').style.display = 'none'
  document.getElementById('datasent').innerHTML = ''

  getData.open('GET', url2, true)

  getData.setRequestHeader('Content-Type', 'application/json')
  getData.setRequestHeader('Authorization', 'Bearer ' + token)

  getData.onreadystatechange = function () {
    if (getData.readyState == 4 && getData.status == 200) {
      var userData = JSON.parse(this.responseText)

      var totalUser = userData.data.length

      var tbl = document.createElement('table')
      tbl.classList.add('table', 'table-striped')

      var thead = document.createElement('thead')
      tbl.appendChild(thead)

      var toprow = document.createElement('tr')
      thead.appendChild(toprow)

      var applicantId = document.createElement('th')
      toprow.appendChild(applicantId)
      applicantId.innerText = 'Applicant Id'

      var firstName = document.createElement('th')
      toprow.appendChild(firstName)
      firstName.innerText = 'First name'

      var middleName = document.createElement('th')
      toprow.appendChild(middleName)
      middleName.innerText = 'Middle name'

      var lastName = document.createElement('th')
      toprow.appendChild(lastName)
      lastName.innerText = 'Last name'

      var passPortNumber = document.createElement('th')
      toprow.appendChild(passPortNumber)
      passPortNumber.innerText = 'Passport number'

      var email = document.createElement('th')
      toprow.appendChild(email)
      email.innerText = 'Email'

      var tbdy = document.createElement('tbody')
      tbl.appendChild(tbdy)
      for (var i = 0; i < totalUser; i++) {
        var tr = document.createElement('tr')
        tbdy.appendChild(tr)

        var tdApplicantId = document.createElement('td')
        tr.appendChild(tdApplicantId)
        tdApplicantId.innerText = userData.data[i].applicantId

        var tdfirstName = document.createElement('td')
        tr.appendChild(tdfirstName)
        tdfirstName.innerText = userData.data[i].firstName

        var tdmiddleName = document.createElement('td')
        tr.appendChild(tdmiddleName)
        tdmiddleName.innerText = userData.data[i].middleName

        var tdlastName = document.createElement('td')
        tr.appendChild(tdlastName)
        tdlastName.innerText = userData.data[i].lastName

        var tdpassportNumber = document.createElement('td')
        tr.appendChild(tdpassportNumber)
        tdpassportNumber.innerText = userData.data[i].passportNumber

        var tdEmail = document.createElement('td')
        tr.appendChild(tdEmail)
        tdEmail.innerText = userData.data[i].email
      }
      result.appendChild(tbl)
    }

    if (getData.readyState == 4 && getData.status == 401) {
      result.innerHTML = 'Unauthorized User <br> First, You need to Login !'
    }
  }

  getData.send()
}

function newApplicant() {
  var result = document.getElementById('applicantResult')

  var disp = document.getElementById('datatab')
  result.innerHTML = ''
  disp.style.marginLeft = '12%'
  disp.style.display = 'block'
}

function sendNewApplicantData() {
  console.log('176')
  var xhrSend = new XMLHttpRequest()
  var url3 =
    'https://lgcgatewayapi-stage.azurewebsites.net/api/applicant/setNewApplicant'
  var result = document.getElementById('applicantResult')

  var firstName = document.getElementById('firstName').value
  var middleName = document.getElementById('middleName').value
  var lastName = document.getElementById('lastName').value
  var citizenshipId = document.getElementById('citizenshipId').value
  //var dateOfBirth = document.getElementById('dateOfBirth').value;
  //var addressLine1 = document.getElementById('addressLine1').value;
  //var city = document.getElementById('city').value;
  //var countryId = document.getElementById('countryId').value;
  //var postalCode = document.getElementById('postalCode').value;
  //var phone = document.getElementById('phone').value;
  var passportNumber = document.getElementById('passportNumber').value
  //var keyWords = document.getElementById('keyWords').value;
  //var isCurrentStudent = document.getElementById('isCurrentStudent').value;
  var email = document.getElementById('email').value
  //var firstLanguage = document.getElementById('firstLanguage').value;
  //var gender = document.getElementById('gender').value;
  //var maritaStatus = document.getElementById('maritaStatus').value;
  //var agentId = document.getElementById('agentId').value;
  //var profileComplete = document.getElementById('profileComplete').value;

  var token = localStorage.getItem('token')

  xhrSend.open('POST', url3, true)

  xhrSend.setRequestHeader('Content-Type', 'application/json')
  xhrSend.setRequestHeader('Authorization', 'Bearer ' + token)

  xhrSend.onreadystatechange = function () {
    if (xhrSend.readyState == 4 && xhrSend.status == 200) {
      document.getElementById('datasent').innerHTML =
        ' Applicant Data Saved Successfully !'

      retrieveData()
    }

    if (xhrSend.readyState == 4 && xhrSend.status == 401) {
      result.innerHTML = ' Invalid Login Credentials ! '

      document.getElementById('addApplicant').style.visibility = 'hidden'
      document.getElementById('fetchList').style.visibility = 'hidden'
      document.getElementById('datatab').style.display = 'none'
    }
  }

  var data2 = JSON.stringify({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    citizenshipId: citizenshipId,
    dateOfBirth: null,
    addressLine1: null,
    city: null,
    province: null,
    countryId: '1',
    postalCode: null,
    phone: null,
    passportNumber: passportNumber,
    keyWords: null,
    isCurrentStudent: false,
    email: email,
    firstLanguage: null,
    gender: null,
    maritaStatus: null,
    agentId: null,
    profileComplete: false,
  })

  xhrSend.send(data2)
}
