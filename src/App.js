import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert"
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';


const App = () => {
  const [charge, setCharge] = useState("");
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({ show: false});
  
  const [expenses, setExpenses ] = useState([
    { id: 1, charge: "렌트비", amount: 1600 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 1200 },
    { id: 4, charge: "헬스비", amount: 100000}
  ])

  const clearItems = () => {
    setExpenses([]);
  }
  //지출항목
  const handleCharge = (e) => {
    console.log(e.target.value);
    setCharge(e.target.value);
  }
  //비용
  const handleAmount = (e) => {
    console.log(e.target.valueAsNumber);
    setAmount(e.target.valueAsNumber);
  }
  //아이템지우기
  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    console.log(newExpenses);
    setExpenses(newExpenses);
    handleAlert({ 
      type: 'danger',
      text: '아이템이 삭제되었습니다.'
    })
  }
  //지출항목수정및 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    //항목 이름이 비어잇지 않거나 비용이 0보다 클때 
    if(charge !== "" && amount > 0) {
      //만약 수정 버튼이 눌렸다면
      if(edit){
        //map으로 새롭게 배열을생성해준다 ... id값을 비교해서 같다면 말이다.
        // 아이템을 받아와서 새로운 item 배열에 넣어준다고 생각
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        // 새로운 비용항목 공간을 생성
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text:'아이템이 수정되었습니다.'})
      } else {
        
        const newExpense = {id: crypto.randomUUID(), charge, amount }
        //불변성을 지켜주기 위해서 새로운 expenses를 생성
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
    }
      setCharge("");
      setAmount(0);
      handleAlert({ type: "success", text: "아이템이 생성되었습니다. "})

    } else {
      console.log('error');
      
      handleAlert({
         type: 'danger',
         text: 'charge는 빈 값일 수 없으며 amount는 0보다 커야합니다.'})
    }
  }
  //수정 및 추가 후 알림
  const handleAlert = ({type,text}) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert( {show:false });
    }, 7000);
  }
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id );
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    
  }
    return (
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text}/> : null }
        <h1>예산 계산기</h1>
        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseForm
          handleCharge={ handleCharge }
          charge={ charge }
          handleAmount={handleAmount}
          amount={ amount }
          handleSubmit={handleSubmit}
          edit={edit}
          handleEdit={handleEdit}
          
        />
        </div>
        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseList 
          expenses={ expenses }
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
           />
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
          <p style={{ fontSize: '2rem'}}>
            총 지출 : 
            <span>
              {expenses.reduce((acc, curr) => {
                return (acc += curr.amount)
              },0)}
              원</span>
          </p>
        </div>
      </main>
    )
  }
export default App; 