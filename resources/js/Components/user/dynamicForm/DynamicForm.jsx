import React, {Component} from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

export  default class DynamicForm extends Component {
  render(){
      const onFinish = values => {
        //Here will get form values
        console.log('Received values of form:', values);
      };
    
      // return (
        
      // );

  return (
    <div className="MainDiv">
      <div className="jumbotron text-center">
          <h3>Therichpost.com</h3>
      </div>
      
      <div className="container">
          
      {/* <Demo /> */}
      <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="off">
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, 'first']}
                      fieldKey={[field.fieldKey, 'first']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'last']}
                      fieldKey={[field.fieldKey, 'last']}
                      rules={[{ required: true, message: 'Missing last name' }]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
      </div>
  );
}



  // state = {
  //   users: [
  //     {
  //       fname: "",
  //       lname: "",
  //       checkbox: false
  //     }
  //   ],
  //   submitted: false,
  //   invalidUsers: []
  // };

  // validateAlpha = (value, name, index) => {
  //   const regex = /^[a-zA-Z]+$/;
  //   if (value && !regex.test(value)) {
  //     this.setState({
  //       invalidUsers: [...this.state.invalidUsers, name + index]
  //     });
  //   } else {
  //     this.setState({
  //       invalidUsers: this.state.invalidUsers.filter(
  //         item => item !== name + index
  //       )
  //     });
  //   }
  //   console.log(this.state.invalidUsers);
  // };

  // handleChange = (event, index) => {
  //   const { users } = this.state;
  //   const { name, value, checked } = event.target;

  //   if (name === "fname") {
  //     users[index].fname = value;
  //   } else if (name === 'lname') {
  //     users[index].lname = value;
  //   } else {
  //     users[index].checkbox = checked;
  //   }
  //   this.setState({
  //     ...users,
  //     users
  //   });

  //   if (name === "fname") {
  //     this.validateAlpha(value, name, index);
  //   }
  //   if (name === "lname") {
  //     this.validateAlpha(value, name, index);
  //   }

  //   console.log(users[index]);
  // };

  // addRow = e => {
  //   e.preventDefault();
  //   const { users } = this.state;
  //   this.setState({
  //     users: [...users, { fname: "", lname: "", checkbox: false }]
  //   });
  // };

  // removeRow = (e, index) => {
  //   e.preventDefault();
  //   const { users } = this.state;
  //   users.splice(index, 1);
  //   this.setState({
  //     ...users,
  //     users
  //   });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { users } = this.state;
  //   let userList = [];
  //   this.setState({ submitted: true });

  //   users.map(user => {
  //     if (user.fname !== "" && user.lname !== "" && user.checkbox !== false) {
  //       userList.push(user);
  //     } else {
  //       console.log("Please fill up the fields");
  //     }
  //   });

  //   if (userList.length) {
  //     console.log(userList);
  //     this.setState({ submitted: false, users: [{ fname: "", lname: "", checkbox: false }] });
  //   }
  // };

  // render() {
  //   const { users, submitted, invalidUsers } = this.state;
  //   return (
  //     <div>
  //       <form onSubmit={this.handleSubmit}>
  //         {users.map((user, index) => (
  //           <div className="row" key={`${user}-${index}`}>
  //             <div className="col">
  //               <label htmlFor="fname" style={{ marginRight: 10 }}>
  //                 First Name
  //               </label>
  //               <input
  //                 type="text"
  //                 id="fname"
  //                 name="fname"
  //                 value={user.fname}
  //                 onChange={event => this.handleChange(event, index)}
  //               />
  //               {submitted && !user.fname && (
  //                 <div style={{ color: "red" }}>First name is required</div>
  //               )}
  //               {submitted && invalidUsers.includes("fname" + index) && (
  //                 <div style={{ color: "red" }}>
  //                   First name must contains only alphabet
  //                 </div>
  //               )}
  //             </div>
  //             <div className="col">
  //               <label htmlFor="lname" style={{ marginRight: 10 }}>
  //                 Last Name
  //               </label>
  //               <input
  //                 type="text"
  //                 id="lname"
  //                 name="lname"
  //                 value={user.lname}
  //                 onChange={event => this.handleChange(event, index)}
  //               />
  //               {submitted && !user.lname && (
  //                 <div style={{ color: "red" }}>Last name is required</div>
  //               )}
  //               {submitted && invalidUsers.includes("lname" + index) && (
  //                 <div style={{ color: "red" }}>
  //                   Last name must contains only alphabet
  //                 </div>
  //               )}
  //             </div>
  //             <div className="col">
  //               <label htmlFor="chk" style={{ marginRight: 10 }}>
  //                 Checkbox
  //               </label>
  //               <input
  //                 type="checkbox"
  //                 id="checkbox"
  //                 name="checkbox"
  //                 checked={user.checkbox}
  //                 onChange={event => this.handleChange(event, index)}
  //               />
  //               {submitted && !user.checkbox && (
  //                 <div style={{ color: "red" }}>Checkbox is required</div>
  //               )}
  //             </div>
  //             {index && users.length > 1 ? (
  //               <button onClick={e => this.removeRow(e, index)}>Remove</button>
  //             ) : (
  //               ""
  //             )}
  //           </div>
  //         ))}
  //         <button onClick={this.addRow}>Add</button>
  //         <button type="submit" style={{ marginLeft: 10 }}>
  //           Submit
  //         </button>
  //       </form>
  //     </div>
  //   );
  // }
}

// import React, { Component } from 'react';
// import Axios from 'axios';


// export  default class DynamicForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       fields: {},
//       errors: {},
//     };
//   }

//   handleValidation() {
//     let fields = this.state.fields;
//     let errors = {};
//     let formIsValid = true;  

//   //Name
//     if (!fields["name"]) {
//       formIsValid = false;
//       errors["name"] = "Cannot be empty";
//     }

//     if (typeof fields["name"] !== "undefined") {
//       if (!fields["name"].match(/^[a-zA-Z]+$/)) {
//         formIsValid = false;
//         errors["name"] = "Only letters";
//       }
//     }

//     //Email
//     if (!fields["email"]) {
//       formIsValid = false;
//       errors["email"] = "Cannot be empty";
//     }

//     if (typeof fields["email"] !== "undefined") {
//       let lastAtPos = fields["email"].lastIndexOf("@");
//       let lastDotPos = fields["email"].lastIndexOf(".");

//       if (
//         !(
//           lastAtPos < lastDotPos &&
//           lastAtPos > 0 &&
//           fields["email"].indexOf("@@") == -1 &&
//           lastDotPos > 2 &&
//           fields["email"].length - lastDotPos > 2
//         )
//       ) {
//         formIsValid = false;
//         errors["email"] = "Email is not valid";
//       }
//     }

//     //Phone
//     if (!fields["phone"]) {
//       formIsValid = false;
//       errors["phone"] = "Cannot be empty";
//     }

//     if (typeof fields["phone"] !== "undefined") {
//       if (
//           !(
//             fields["phone"].length >= 10 &&
//             fields["phone"].length <= 11
//           )
//         ) {
//         formIsValid = false;
//         errors["phone"] = "Phone is not valid";
//       }
//     }

//     this.setState({ errors: errors });
//     return formIsValid;
//   }

//   contactSubmit(e) {
//     e.preventDefault();

//     if (this.handleValidation()) {
//       alert("Form submitted");
//     } else {
//       alert("Form has errors.");
//     }
//   }

//   handleChange(field, e) {
//     let fields = this.state.fields;
//     fields[field] = e.target.value;
//     this.setState({ fields });
//   }

//   render() {
//     return (
//       <div>
//         <form
//           name="contactform"
//           className="contactform"
//           onSubmit={this.contactSubmit.bind(this)}
//         >
//           <div className="col-md-6">
//             <fieldset>
//               <input
//                 ref="name"
//                 type="text"
//                 size="30"
//                 placeholder="Name"
//                 onChange={this.handleChange.bind(this, "name")}
//                 value={this.state.fields["name"]}
//               />
//               <span style={{ color: "red" }}><br />{this.state.errors["name"]}<br /></span>
              
//               <input
//                 refs="email"
//                 type="text"
//                 size="30"
//                 placeholder="Email"
//                 onChange={this.handleChange.bind(this, "email")}
//                 value={this.state.fields["email"]}
//               />
//               <span style={{ color: "red" }}><br />{this.state.errors["email"]}<br /></span>
              
//               <input
//                 refs="phone"
//                 type="text"
//                 size="30"
//                 placeholder="Phone"
//                 onChange={this.handleChange.bind(this, "phone")}
//                 value={this.state.fields["phone"]}
//               />
//               <span style={{ color: "red" }}><br />{this.state.errors["phone"]}<br /></span>
              
//               <input
//                 refs="address"
//                 type="text"
//                 size="30"
//                 placeholder="Address"
//                 onChange={this.handleChange.bind(this, "address")}
//                 value={this.state.fields["address"]}
//               />
//               <br />
//             </fieldset>
//           </div>
//           <button type="submit">submit</button>
//         </form>
//       </div>
//     );
//   }
// }


// export  default class DynamicForm extends Component {
//   state = {
//     items: [
//       {
//         titulo: "titulo1",
//         ano: "ano1",
//         reso: "reso1",
//       },
//       {
//         titulo: "titulo2",
//         ano: "ano2",
//         reso: "reso2",
//       },
//       {
//         titulo: "titulo1",
//         ano: "ano2",
//         reso: "reso12",
//       },
//     ],
//     updatedItems: [],
//     filterTitle: "",
//     filterYear: "",
//     filterReso: "",
//   };

//   searchFilter = () => {
//     return (
//       <form>
//         <input
//           name="filterTitle"
//           type="text"
//           value={this.filterTitle}
//           onChange={(e) => this.handleSearchFilter(e, "filterTitle")}
//         />
//         <input
//           name="filterYear"
//           type="text"
//           value={this.filterYear}
//           onChange={(e) => this.handleSearchFilter(e, "filterYear")}
//         />
//         <input
//           name="filterReso"
//           type="text"
//           value={this.filterReso}
//           onChange={(e) => this.handleSearchFilter(e, "filterReso")}
//         />
//       </form>
//     );
//   };

//   handleSearchFilter = (event, key) => {
//     const inputValue = event.target.value;
//     this.setState({ [key]: inputValue }, () => {
//       this.filterList();
//     });
//   };

//   filterList = () => {
//     const itemsUpdate = this.state.items.filter((item) => {
//       var filterTitle =
//         item.titulo
//           .toLowerCase()
//           .indexOf(this.state.filterTitle.toLowerCase()) > -1;
//       var filterYear =
//         item.ano.toLowerCase().indexOf(this.state.filterYear.toLowerCase()) >
//         -1;
//       var filterReso =
//         item.reso.toLowerCase().indexOf(this.state.filterReso.toLowerCase()) >
//         -1;
//       return filterTitle && filterYear && filterReso;
//     });
//     this.setState({ updatedItems: itemsUpdate }, () => {
//       console.log(this.state.updatedItems);
//     });
//   };

//   renderList = () => {
//     const { updatedItems, items } = this.state;

//     let tableData;

//     if(!updatedItems.length) {
//       tableData = (
//         <React.Fragment>
//           {items.map((updatedItem) => {
//             return (
//               <div>
//                 {updatedItem.titulo}
//                 {updatedItem.ano}
//                 {updatedItem.reso}
//               </div>
//             );
//           })}
//         </React.Fragment>
//       )
//     }else{
//       tableData = (
//         <React.Fragment>
//           {updatedItems.map((updatedItem) => {
//             return (
//               <div>
//                 {updatedItem.titulo}
//                 {updatedItem.ano}
//                 {updatedItem.reso}
//               </div>
//             );
//           })}
//         </React.Fragment>
//       )
//     }

//     return (
//       <div>
//         {tableData}
//       </div>
//     );
//   };

//   render() {
//     return (
//       <div>
//         {this.searchFilter()}
//         {this.renderList()}
//       </div>
//     );
//   }
// }


// export  default class DynamicForm extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             jadwals: [],
//             jadwal: [],
//             jadwa: [],
//         };

//         this.filterList = this.filterList.bind(this);
//         this.filterList2 = this.filterList2.bind(this);

//     }

//     componentDidMount() {
//         this.getJadwal();
//         this.getJa();
//         this.getJ();
//     }

//     getJadwal() {
//         Axios.get('http://localhost:8000/api/mirano-travel/admin/jadwal')
//             .then(response => {
//                 this.setState({
//                     jadwals: response.data
//                 })
//             })
//             .catch(error => console.log(error))
//     }

//     getJa() {
//         Axios.get('http://localhost:8000/api/mirano-travel/admin/jadwal')
//             .then(response => {
//                 this.setState({
//                     jadwal: response.data
//                 })
//             })
//             .catch(error => console.log(error))
//     }

//     getJ() {
//         Axios.get('http://localhost:8000/api/mirano-travel/admin/jadwal')
//             .then(response => {
//                 this.setState({
//                     jadwa: response.data
//                 })
//             })
//             .catch(error => console.log(error))
//     }

//     filterList(event) {
//         let value = event.target.value;
//         let jadwals = this.state.jadwals, jadwal=[];
//         jadwal = jadwals.filter((j)=>{
//             return j.keberangkatan.toLowerCase().search(value) != -1;
//         });
//         this.setState({jadwal});
//     }

//     filterList2(event) {
//         let value = event.target.value;
//         let jadwals = this.state.jadwals, jadwa=[];
//         jadwa = jadwals.filter((j)=>{
//             return j.tujuan.toLowerCase().search(value) != -1;
//         });
//         this.setState({jadwa});
//     }

//   render(){

//     const jadwalList = this.state.jadwal.map((j) => {
//       return <li>{j.keberangkatan} {"ke"} {j.tujuan}</li>;
//     });

//     return(<div>
//       <input type="text" placeholder="Keberangkatan" onChange={this.filterList}/>
//       <input type="text" placeholder="Tujuan" onChange={this.filterList2}/>
//       <ul>
//         {jadwalList}
//       </ul>
//       </div>
//     );

//   }
// }

// const styles = {
//     display: 'flex',
//     flexDirection: 'column',
//     fontFamily: 'sans-serif',
// };

// export default class DynamicForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             vals: []
//         }
//         this._refs = {};
//     }

//     componentDidMount () {
//         const arr = [
//             { id: 1, username: 'fred' }, 
//             { id: 2, username: 'bill' }, 
//             { id: 3, username: 'ted' }
//         ];
        
//         var array1 = [1, 2, 3];

//         // if (array1.includes(4)) {
//         //     console.log("data sudah ada");
//         // } else {
//         //     console.log("data belun tersedia");
//         // }
//         if ( arr.some(el => el.username === "fred") ) {
//             console.log("data exist");
//         } else {
//             console.log("data is not exist");
//         }
//     }

//     onChange = () => {
//         this.setState({
//             vals: Object.keys(this._refs).map(key => this._refs[key] && this._refs[key].value)
//         });

//         console.log(this.state.vals);
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <div style={styles}>
//                     AllVals: {this.state.vals.join(', ')}
//                     <div>
//                         <ComponentB _ref={ref => this._refs['b'] = ref} onChange={this.onChange} />
//                     </div>
//                     <div><ComponentC _ref={ref => this._refs['c'] = ref} onChange={this.onChange} /></div>
//                     <div><ComponentD _ref={ref => this._refs['d'] = ref} onChange={this.onChange} /></div>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }

// const ComponentB = ({ _ref, onChange }) => (
//     <input ref={_ref} onChange={onChange} type="text" />
// );

// const ComponentC = ({ _ref, onChange }) => (
//     <input ref={_ref} onChange={onChange} type="text" />
// );

// const ComponentD = ({ _ref, onChange }) => (
//     <input ref={_ref} onChange={onChange} type="text" />
// );


// import React, { Component } from 'react';

// export default class DynamicForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             values: [] 
//         };
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     createUI() {
//         return this.state.values.map((el, i) =>
//             <div key={i}>
//                 <input type="text" value={el || ''} onChange={this.handleChange.bind(this, i)} />
//                 <input type='button' value='remove' onClick={this.removeClick.bind(this, i)} />
//             </div>
//         )
//     }

//     handleChange(i, event) {
//         let values = [...this.state.values];
//         values[i] = event.target.value;
//         this.setState({ values });
//     }

//     addClick() {
//         this.setState(prevState => ({ values: [...prevState.values, ''] }))
//     }

//     removeClick(i) {
//         let values = [...this.state.values];
//         values.splice(i, 1);
//         this.setState({ values });
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         // alert('A name was submitted: ' + this.state.values.join(', '));

//         console.log(this.state.values);
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <form onSubmit={this.handleSubmit}>
//                     {this.createUI()}        
//                     <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
//                     <input type="submit" value="Submit" />
//                 </form>
//             </React.Fragment>
//         )
//     }
// }


// import React from "react"
// import { Fragment } from "react"
// class DynamicForm extends React.Component {
//     state = {
//         cats: [{ name: "", age: "" }],
//         owner: "",
//         description: ""
//     }
//     handleChange = (e) => {
//         if (["name", "age"].includes(e.target.className)) {
//             let cats = [...this.state.cats]
//             cats[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
//             // this.setState({ cats }, () => console.log(this.state.cats))
//             this.setState({ cats })
//         } else {
//             this.setState({ [e.target.name]: e.target.value.toUpperCase() })
//         }
//     }
//     addCat = (e) => {
//         this.setState((prevState) => ({
//             cats: [...prevState.cats, { name: "", age: "" }],
//         }));
//     }
//     handleSubmit = (e) => {
//         e.preventDefault() 

//         console.log(this.state.cats);
//     }

//     render() {
//         let { owner, description, cats } = this.state
//         return (
//             <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
//                 <label htmlFor="name">Owner</label>
//                 <input type="text" name="owner" id="owner" value={owner} />
//                 <label htmlFor="description">Description</label>
//                 <input type="text" name="description" id="description" value={description} />
//                 <button onClick={this.addCat}>Add new cat</button>
//                 {
//                     cats.map((val, idx) => {
//                         let catId = `cat-${idx}`, ageId = `age-${idx}`
//                         return (
//                             <div key={idx}>
//                                 <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
//                                 <input
//                                     type="text"
//                                     name={catId}
//                                     data-id={idx}
//                                     id={catId}
//                                     value={cats[idx].name}
//                                     className="name"
//                                 />
//                                 <label htmlFor={ageId}>Age</label>
//                                 <input
//                                     type="text"
//                                     name={ageId}
//                                     data-id={idx}
//                                     id={ageId}
//                                     value={cats[idx].age}
//                                     className="age"
//                                 />
//                             </div>
//                         )
//                     })
//                 }
//                 <input type="submit" value="Submit" />
//             </form>
//         )
//     }
// }
// export default DynamicForm


// import React, {Component} from "react";
// import TaskList from "./taskList";
// // import axios from 'axios';
// import { NotificationContainer } from 'react-notifications';
// export default class DynamicForm extends Component {
//     state = {
//         taskList: [{ index: Math.random(), projectName: "", task: "", taskNotes: "", taskStatus: "" }],
//         date: "",
//         description: "",
//     }

//     handleChange = (e) => {
//         if (["projectName", "task", "taskNotes", "taskStatus"].includes(e.target.name)) {
//             let taskList = [...this.state.taskList]
//             taskList[e.target.dataset.id][e.target.name] = e.target.value;
//         } else {
//             this.setState({ [e.target.name]: e.target.value })
//         }
//     }
//     addNewRow = () => {
//         this.setState((prevState) => ({
//             taskList: [...prevState.taskList, { index: Math.random(), projectName: "", task: "", taskNotes: "", taskStatus: "" }],
//         }));
//     }


//     deteteRow = (index) => {
//         this.setState({
//             taskList: this.state.taskList.filter((s, sindex) => index !== sindex),
//         });
//         // const taskList1 = [...this.state.taskList];
//         // taskList1.splice(index, 1);
//         // this.setState({ taskList: taskList1 });
//     }
//     handleSubmit = (e) => {
//         e.preventDefault();
//         // if(this.state.date==='' || this.state.description==='')
//         // {
//         //     NotificationManager.warning("Please Fill up Required Field . Please check Task and Date Field");
//         //     return false;
//         // }
//         // for(var i=0;i<this.state.taskList.length;i++)
//         // {
//         //         if(this.state.taskList[i].projectName==='' || this.state.taskList[i].task==='')
//         //         {
//         //             NotificationManager.warning("Please Fill up Required Field.Please Check Project name And Task Field");
//         //             return false;
//         //         }
//         // }
//         // let data = { formData: this.state, userData: localStorage.getItem('user') }
//         // axios.defaults.headers.common["Authorization"] = localStorage.getItem('token');
//         // axios.post("http://localhost:9000/api/task", data).then(res => {
//         //     if(res.data.success) NotificationManager.success(res.data.msg);
//         // }).catch(error => {
//         //     if(error.response.status && error.response.status===400)
//         //     NotificationManager.error("Bad Request");
//         //     else NotificationManager.error("Something Went Wrong");
//         //     this.setState({ errors: error })
//         // });

//         console.log(this.state.taskList);
//     }
//     clickOnDelete(record) {
//         this.setState({
//             taskList: this.state.taskList.filter(r => r !== record)
//         });
//     }
//     render() {
//         let { taskList } = this.state//let { notes, date, description, taskList } = this.state
//         return (
//             <div className="content">
//                 <NotificationContainer/>
//                 <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
//                     <div className="row" style={{ marginTop: 20 }}>
//                         <div className="col-sm-1"></div>
//                         <div className="col-sm-10">
//                             <div className="card">
//                                 <div className="card-header text-center">Add Your Daily Task</div>
//                                 <div className="card-body">
//                                     <div className="row">
//                                         <div className="col-sm-4">
//                                             <div className="form-group ">
//                                                 <label className="required">Date</label>
//                                                 <input type="date"  name="date" id="date" className="form-control" placeholder="Enter Date" />
//                                             </div>
//                                         </div>
//                                         <div className="col-sm-4">
//                                             <div className="form-group ">
//                                                 <label className="required">Description</label>
//                                                 <textarea name="description"  id="description" className="form-control"></textarea>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <table className="table">
//                                         <thead>
//                                             <tr>
//                                                 <th className="required" >Project Name</th>
//                                                 <th className="required" >Task</th>
//                                                 <th>Notes</th>
//                                                 <th>Status</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <TaskList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} taskList={taskList} />
//                                         </tbody>
//                                         <tfoot>
//                                             <tr><td colSpan="4">
//                                                 <button onClick={this.addNewRow} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
//                                             </td></tr>
//                                         </tfoot>
//                                     </table>
//                                 </div>
//                                 <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center">Submit</button></div>
//                             </div>
//                         </div>
//                         <div className="col-sm-1"></div>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }