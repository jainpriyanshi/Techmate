import React, { Component } from 'react'

export default class faq extends Component {
    
    render() {
        const state = [{
            ques: "How do I start my own project?",
            ans: "You can start a project from the `propose project` option in the sidebar. The form is intuitive and will guide you step by step." 
        },
        {
            ques: "How do I team up?",
            ans: "Contact the developers in the community through the contact email mentioned in the profile."
        },
        {
            ques: "What does the category: Upcoming, Ongoing, Completed mean?",
            ans: "`Upcoming` means that mentors/mentees are needed. Feel free to contact the project proposer and join the team `Ongoing` means that the project and its team members is finalized, and it is underway.`Completed` means that the project has been completed, feel free to view the gitHub repository and give a star."
        },
        {
            ques: "What is meant by the `State` of my project?",
            ans: "`State` lets other people know the status of your project .If you need developers, set state to `Upcoming`. If your team is finalized, set `state` to `Ongoning`.Once your project is finished,set state to `Completed`."
        },
        {
            ques: "I am interested in pair programming , How to approach other",
            ans: "Post Your Project Idea using propose Project link asking for teammates"
        }
        ]
        return (
            <div class="inner" style={{textAlign: "left" , fontFamily: "roboto"}}>
                <h1 style={{textAlign: "center"}}> Frequently Asked Questions </h1>
                {state.map((index)=>(
                    <div>
                       <strong> Q. {index.ques} </strong> 
                        <p> Ans.  {index.ans} </p>                  
                    </div>
                ))}
            </div>
        )       
    }
}