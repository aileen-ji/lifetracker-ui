import API from "../../services/apiClient"
import * as React from "react"
import { useState } from "react"
import "./NutritionForm.css"

export default function NutritionForm(props) {
    console.log(props)
    const [form, setForm] = useState({
        name: "",
        calories: 1,
        imageUrl: "",
        category: ""
      })
    const [error, setError] = useState({})

    const handleOnInputChange = (event) => {
        setForm((state) => ({ ...state, [event.target.name]: event.target.value }))
    }

    const handleSubmit = async (e) => {
        //placeholder
        e.preventDefault()

        const {data, err} = await API.createNutrition({name: form.name,
                    calories: form.calories,
                    imageUrl: form.imageUrl,
                    category: form.category})

        if(err) setError((state) => ({ ...state, form: err?.response?.data?.error?.message }))
        if (data){
            setForm({
                            name: "",
                            calories: 1,
                            imageUrl: "",
                            category: ""
                        })
        }
        // try{
        //     const json = await axios.post("http://localhost:3001/nutrition", {
        //         name: form.name,
        //         calories: form.calories,
        //         imageUrl: form.imageUrl,
        //         category: form.category
        //     })
        //     if(json?.data?.nutrition){
        //         setForm({
        //             name: "",
        //             calories: 1,
        //             imageUrl: "",
        //             category: ""
        //         })
        //     }
        //     else{
        //         setError((state) => ({ ...state, form: "Something went wrong with registration." }))
        //     }
        // }catch(err) {
        //     const message = err?.response?.data?.error?.message
        //     setError((state) => ({ ...state, form: message ? String(message) : String(err) }))
        // }
        // console.log(error)
    }

  return (
    <div className="nutrition-form">
        <h1>Record Nutrition</h1>
        <img src="\src\assets\icons8-cauliflower-60.png"></img>
        <form>
        <div className="form-inputs">
        <div className="InputField">
            <label>Name</label>
            <input className="form-input" type="text" name="name"
                            placeholder="Nutrition name"
                            value={form.name}
                            onChange={handleOnInputChange}/>
        </div>
        <div className="InputField">
            <label>Calories</label>
            <input className="form-input" type="number" name="calories"
                                placeholder="1"
                                value={form.calories}
                                onChange={handleOnInputChange}/>
        </div>
        <div className="InputField">
            <label>Image Url</label>
            <input className="form-input" type="url" name="imageUrl"
                            placeholder="http://www.food-image.com/1"
                            value={form.imageUrl}
                            onChange={handleOnInputChange}/>
        </div>
        <div className="InputField">
            <label>Category</label>
            <input className="form-input" type="text" name="category"
                            placeholder="Nutrition category"
                            value={form.category}
                            onChange={handleOnInputChange}/>
        </div>
        </div>
        <button className="submit-nutrition" onClick={handleSubmit}>Save</button>
        </form>
    </div>
  )
}