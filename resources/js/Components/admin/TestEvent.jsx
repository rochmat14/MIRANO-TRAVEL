import React, { Component } from "react";

export default class TestEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGrades: []
        };
        this.onSelectGrade = this.onSelectGrade.bind(this);
    }
    onSelectGrade(e) {
        console.log(e.target);
        this.setState(
            {
                selectedGrades: {
                    ...this.state.selectedGrades,
                    [e.target.id]: e.target.value
                }
            },
            () => {
                console.log(this.state);
            }
        );
    }

    getOuput = () => {
        return Object.keys(this.state.selectedGrades).map(key => {
            // console.log(key);
            return { id: key, cid: this.state.selectedGrades[key] };
        });
    };

    render() {
        console.log(this.getOuput());
        // console.log(this.state.selectedGrades);

        if( this.getOuput().some(el => el.cid === "1") ) {
            console.log("data is already")
        }
        return (
            <React.Fragment>
                <h1>store select in react js</h1>

                <select
                    defaultValue="Default"
                    id="22"
                    onChange={this.onSelectGrade}
                >
                    <option value="Default">
                        Choose grade
                    </option>
                    <option value="1" disabled={ this.getOuput().some(el => el.cid === "1") }>A</option>
                    <option value="2" disabled={ this.getOuput().some(el => el.cid === "2") }>B</option>
                    <option value="3" disabled={ this.getOuput().some(el => el.cid === "3") }>c</option>
                </select>

                <select
                    defaultValue="Default"
                    id="23"
                    onChange={this.onSelectGrade}
                >
                    <option value="Default">
                    Choose grade
                    </option>
                    <option value="1" disabled={ this.getOuput().some(el => el.cid === "1") }>A</option>
                    <option value="2" disabled={ this.getOuput().some(el => el.cid === "2") }>B</option>
                    <option value="3" disabled={ this.getOuput().some(el => el.cid === "3") }>c</option>
                </select>

                <select
                    defaultValue="Default"
                    id="24"
                    onChange={this.onSelectGrade}
                >
                    <option value="Default">
                    Choose grade
                    </option>
                    <option value="1" disabled={ this.getOuput().some(el => el.cid === "1") }>A</option>
                    <option value="2" disabled={ this.getOuput().some(el => el.cid === "2") }>B</option>
                    <option value="3" disabled={ this.getOuput().some(el => el.cid === "3") }>c</option>
                </select>
            </React.Fragment>
        );
    }
}


// import React, { useState } from "react";

// export default function TestEvent() {
//   const values = ["orange", "apple", "banana", "mango"];
//   const [questions, setquestions] = useState(values);
//   const [selectedQ, setselectedQ] = useState([]);
//   const getOptions = () => {
//     return questions.map((item, index) => (
//       <option key={item} value={item}>
//         {item}
//       </option>
//     ));
//   };

//   const getSelectedQ = () => {
//     return selectedQ.map((item) => {
//       return (
//         <select key={item} style={{ marginVertical: 10 }}>
//           <option value={item}>{item}</option>
//         </select>
//       );
//     });
//   };

//   return (
//     <div className="App">
//       {getSelectedQ()}
//       <select
//         style={{ marginVertical: 10 }}
//         onChange={(e) => {
//           console.log(e.target.value);
//           setselectedQ([...selectedQ, e.target.value]);
//           var remainingQ = questions.filter((item) => item !== e.target.value);
//           setquestions(remainingQ);
//           console.log(remainingQ);
//         }}
//       >
//         {getOptions()}
//       </select>
//     </div>
//   );
// }