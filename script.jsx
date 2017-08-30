    /*Design layout of the app

  EmployeeApp: The app has a top-level component named as EmployeeApp. This component is composed of following   components:
          *EmployeeList: EmployeeList component represents a list of employees and has code to render the same.

          *Employee: Employee component represents a single employee and has an onClick event for removing and editing the employee details.

          *NewRow: NewRow component is used to capture the data (employee information). It has an onSubmit form event to capture row submit.
  */




  /*EmployeeApp is a top level component and is used to handle different state changes using API's

     getInitialState API called to set the initial state to the default list passed to the EmployeeApp component
     handleNewRowSubmit: This API is used to change the state due to addition of a new employee. 
  */

    var EmployeeApp = React.createClass({
    getInitialState: function() {
      return {
               employeelist : this.props.employees
          };
    },

    handleNewRowSubmit: function(newemployee) {
        this.setState( {employeelist: this.state.employeelist.concat([newemployee])} );
    },

   onEdit: function(employee){
        this.setState({editMe: employee})
   },

    handleEmployeeRemove: function( employee ) {
      var index = -1;   
      var clength = this.state.employeelist.length;
        for( var i = 0; i < clength; i++ ) {
            if( this.state.employeelist[i].fname === employee.fname ) {
                index = i;
                break;
            }
        }
        this.state.employeelist.splice( index, 1 );  
        this.setState( {employeelist: this.state.employeelist} );
    },
    render: function() {
      var tableStyle = {width: '100%'};
      var leftTdStyle = {width: '50%',padding:'20px',verticalAlign: 'top'};
      var rightTdStyle = {width: '50%',padding:'20px',verticalAlign: 'top'};
      return ( 
        <table style={tableStyle}>
          <tr>
            <td style={leftTdStyle}>
              <EmployeeList elist={this.state.employeelist}  onEmployeeRemove={this.handleEmployeeRemove} onEdit={this.onEdit}/>
            </td> 
            </tr>
            <tr>
            <td style={rightTdStyle}>
              <NewRow onRowSubmit={this.handleNewRowSubmit} editMe={this.state.editMe}/>

            </td>
          </tr>
      </table>
      );
    }
  });





  /*
  EmployeeList Component consist of render method which creates and diplays the table
  */

  var EmployeeList = React.createClass({
    handleEmployeeRemove: function(employee){
      this.props.onEmployeeRemove(employee);
    },

    onEdit: function (employee){
      this.props.onEdit(employee);
    },

    render: function() {
      var employees = [];
      var that = this; 
      this.props.elist.forEach(function(employee) {
       employees.push(<Employee employee={employee} onEmployeeDelete={that.handleEmployeeRemove} onEdit={that.onEdit} /> );

     });
     var tablePos = {width:'90%', marginLeft:'5%'}
      return ( 
        <div style={tablePos}>
          <h3>List of Employees</h3>
          <table className="table table-striped" id="tableId">
            <thead><tr><th>Name</th><th>Age</th><th>Nick Name</th><th>Actions</th></tr></thead>
            <tbody>{employees}</tbody>
          </table>
        </div>
        );
    }
  });




  /*
  Employee Component handles events such as row update, cancel update, remove employee using different methods
  */

  var Employee = React.createClass({
        getInitialState : function(){
            return {
            editing  : false,
            fname : this.props.employee.fname,
            age : this.props.employee.age,
            nick : this.props.employee.nick,

          };
      },
      _onchangeFname:function(event) {
      this.setState({fname : event.target.value});
      },
      _onchangeAge:function(event){
       this.setState({age : event.target.value});
      },
      _onchangeNick:function(event){
        this.setState({nick : event.target.value});
      
      },  
        
    handleRemoveEmployee: function() {
        this.props.onEmployeeDelete( this.props.employee );
        return false;
      },
    
    handleRowEdit:function() {

      var getFname    = this.state.fname.trim();
      var getAge = this.state.age;
      var getNick = this.state.nick;

       this.setState({  
                getFname : this.state.fname,
              getAge : this.state.age,
              getNick : this.state.nick
             }) 
      
       this.setState({editing : true });
       return false;
    },
    handleUpdateRow:function(){

        var getFname    = this.state.fname.trim();
        var getAge = this.state.age;
        var getNick = this.state.nick;

        if(!/^[a-zA-Z ]+$/.test(getFname) || getFname.length < 2 || getFname.length > 40){
          alert("Special character and numerics are not allowed. Full Name should be atleast 2 characters");
          return false;
        }

        if(getAge < 0 || getAge > 200){      
          alert("Please enter age between 0 - 200");
          return false;
        }

        if(!/^[a-zA-Z0-9!@#$ ]+$/.test(getNick) || getNick.length < 2 || getNick.length > 20){
          alert("Only four special characters[ ! @ # $] are allowed along with alphanumeric. Minimum 2 characters");
          return false;
        }


    
         this.setState({  
                  getFname : this.state.fname,
                getAge : this.state.age,
                getNick : this.state.nick
               }) 
      
       
        this.props.employee.fname = getFname;
        this.props.employee.age = getAge;
        this.props.employee.nick = getNick;
       
       this.setState({editing : false });
       return false;
    },
    handleCancelEdit : function(){
     this.setState({editing : false });
      return false;
    },
    render: function() {
       var inputStyle = {padding:'-3px'};
       var EditBtn = <input type ="button"  className ="btn btn-primary" 
                value ="Edit" onClick ={this.handleRowEdit} />;
       var UpdateBtn = <input type ="button"  className ="btn btn-primary" 
                value ="Update" onClick ={this.handleUpdateRow} />;
       var RemoveBtn = <input type ="button"  className ="btn btn-primary" 
                value ="Remove" onClick ={this.handleRemoveEmployee}/>;
       var CancelEditBtn = <input type ="button"  className ="btn btn-primary" 
                 value ="Cancel" onClick = {this.handleCancelEdit}/>;
        return(
         <tr>
            <td>{this.state.editing ? <input type="text" style={inputStyle} ref="Fname" 
                          value={this.state.fname} onChange={this._onchangeFname} /> 
                        : this.props.employee.fname}</td>
            <td>{this.state.editing ? <input type="number" style={inputStyle} ref="Age"
                          value={this.state.age} onChange={this._onchangeAge} /> 
                        : this.props.employee.age}</td>
            <td>{this.state.editing ? <input type="text" style={inputStyle} ref="Nick"
                          value={this.state.nick} onChange={this._onchangeNick}/> 
                        : this.props.employee.nick}</td>
            <td>{this.state.editing ? UpdateBtn : EditBtn }</td>
            <td>{this.state.editing ? CancelEditBtn : RemoveBtn}</td>
          </tr>
        )
      }
      });




  /*
  handleSubmit in NewRow Component reads/captures the input and invokes the onRowSubmit method which invokes the callback method to pass the event upward in the hierarchy to add a new employee (row) in the table.
  */

  var NewRow = React.createClass({

     handleSubmit: function(fname) {
     var fname = this.refs.fname.getDOMNode().value;
     var age = this.refs.age.getDOMNode().value;
     var nick = this.refs.nick.getDOMNode().value;
     var newrow = {fname: fname, age: age, nick: nick };
      this.props.onRowSubmit(newrow);

      this.refs.fname.getDOMNode().value = '';
      this.refs.age.getDOMNode().value = '';
      this.refs.nick.getDOMNode().value = '';
      return false;
    },

     componentDidMount: function(){
      this.refs.fname.getDOMNode().focus(); 
    },


     render: function() {
      var inputStyle = {padding:'12px'}
      var formBasePos = {width:'80%', marginLeft:'10%'}
      var formPos = {marginLeft:'25%'}
      return ( 
        <div className="well" style={formBasePos} >
          <h4>Add A Employee :</h4>
        <form onSubmit={this.handleSubmit} className="form-group row" style={formPos}>
            
            <div className="col-xs-2">
            <input type="text" style={inputStyle} className="form-control" pattern="[a-zA-Z ]{2,40}"  placeholder="Full Name" ref="fname" title="Special character and numerics are not allowed. Full Name should be atleast 2 characters" required/>
            </div>
            
            <div className="col-xs-2">
            <input type="number" style={inputStyle}  className="form-control" min="0" max="200"  placeholder="Age" ref="age" required/>
            </div>
          
            <div className="col-xs-2">
            <input type="text" style={inputStyle} className="form-control" pattern="[a-zA-Z0-9!@#$ ]{2,20}" placeholder="Nick Name" ref="nick" title="Only four special characters[ ! @ # $] are allowed along with alphanumeric. Minimum 2 characters" required/>
            </div>
            
            <div className="col-xs-2">
            <input type="submit" style={inputStyle} className="btn btn-primary" value="Add Employee" required/>
            </div>
        </form>
        </div>
        );
    }
  });


   var defEmployees = [{fname:"Sourav Roy",age:22,nick:"Sourav"},
                      {fname:"Gourav Roy",age:23,nick:"Gourav"}];
  React.render( <EmployeeApp employees={defEmployees} />, document.getElementById("app"));