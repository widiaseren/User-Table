import React, { useState } from "react";

const defaultFormFields = {
  id: '',
  fullname: '',
  email: '',
  phone: '',
  gender: '',
}

const App = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [userData, setUsersData] = useState([]);

  const { id, fullname, email, phone, gender } = formFields;

  const onSubmitForm = async (e) => {
    e.preventDefault();

    //Input validation alert:
    if(!fullname || !email || !phone || !gender) alert('All input must be filled!');

    else {
      if(formFields.id){

        const dataUser = [...userData];
        const index = dataUser.findIndex((user) => user.id === id);

        const editData = {
          id: id,
          fullname: fullname,
          email: email,
          phone: phone,
          gender: gender,
        }

        dataUser[index] = editData
        setUsersData(dataUser);
  
        alert('Data Berhasil Diupdate');
        setFormFields(defaultFormFields);

      } else {
        // Email validation alert:
        if(userData.some(user => user.email === email)) alert('Email is already used!')

        else {
          const newUsers = {
            id: userData.length > 0 ? (userData[userData.length-1].id + 1) : 1,
            fullname: fullname,
            email: email,
            phone: phone,
            gender: gender,
          }
    
          const newUsersData = [...userData, newUsers]
          setUsersData(newUsersData);
    
          alert('Data Berhasil Disimpan');
          setFormFields(defaultFormFields);
        }
      }
    }   
  }

  const onResetForm = (e) => {
    e.preventDefault();
    setFormFields(defaultFormFields);
  }

  const onHandleChange = (e) => {
    e.preventDefault()

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormUsers = { ...formFields}
    newFormUsers[fieldName] = fieldValue;

    setFormFields(newFormUsers)
  }

  const handleEditButton = (id) => {

    const newDataEdit = [...userData];
    const getData = newDataEdit.find((user) => user.id === id);
    // console.log(getData)

    const newData = {
      id: getData.id,
      fullname: getData.fullname,
      email: getData.email,
      phone: getData.phone,
      gender: getData.gender,
    }

    setFormFields(newData)
  }

  const handleDeleteButton = (id) => {

    const newDataDelete = [...userData];
    const getIndex = newDataDelete.findIndex((user) => user.id === id);
    // console.log(getIndex);
    newDataDelete.splice(getIndex, 1);
    
    setUsersData(newDataDelete);
    alert('Data Berhasil Dihapus');
  }

  return (
    <div className="App">
      <h1>Users</h1>
      <form onSubmit={onSubmitForm} onReset={onResetForm}>
        <div className="form-group">
          <label>Name: </label>
          <input 
            aria-label="name-input"
            type="text"
            placeholder="User Example"
            className="form-control"
            name="fullname"
            onChange={onHandleChange}
            value={fullname}
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input 
            aria-label="email-input"
            type="email"
            placeholder="username@example.com"
            className="form-control"
            name="email"
            onChange={onHandleChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Phone: </label>
          <input 
            aria-label="phone-input"
            type="tel"
            placeholder="081111111111111"
            className="form-control"
            name="phone"
            onChange={onHandleChange}
            value={phone}
          />
        </div>
        <div className="form-group">
          <label>Gender: </label>
          <select 
            aria-label="gender-input"
            className="form-control"
            name="gender"
            onChange={onHandleChange}
            value={gender}         
          >
            <option value="">Pick a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="button-group">
          <button className="btn btn-secondary" type="reset">Clear</button>
          {
            formFields.id ? 
            <button className="btn btn-secondary" type="submit">Update</button>
            :        
            <button className="btn btn-secondary" type="submit">Create</button>
          }
        </div>
      </form>
      <br/>

      <table aria-label="button-group">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            userData.map((users, index) => {
              return (
                <tr key={index}>
                  <td>{users.id}</td>
                  <td>{users.fullname}</td>
                  <td>{users.email}</td>
                  <td>{users.phone}</td>
                  <td>{users.gender}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn btn-secondary btn-edit"
                      onClick={() => handleEditButton(users.id)}
                    >Edit</button>
                    <button 
                      className="btn btn-secondary btn-edit"
                      onClick={() => handleDeleteButton(users.id)}
                    >Delete</button>
                  </td>
                </tr>
              )
            })
          }
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
