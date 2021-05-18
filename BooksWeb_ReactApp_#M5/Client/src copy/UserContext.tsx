import React, { useReducer } from 'react';
import Reducer from './Reducer'
 
const UserContext=React.createContext<any>({})

const ContextProvider=(props:any)=>{
    const [state, dispatch] = useReducer(Reducer, {} ,()=>{
        return {
            books:[
                {
                    id: 1,
                    title: "The Accurssed God",
                    author : "Vivek Dutta Mishra",
                    rating: "5",
                    price : "250",
                    cover: "https://thelostepic.com/wp-content/uploads/2021/04/THE-ACCURSED-GOD-Front-780x1100-1.jpg",
                    description: "THE LOST EPIC ============ The story of the epic battle of Kurukshetra has been told and retold for ages. Millennia of dust, fables, imaginations — and the epic itself is lost. What remained is the story of a family feud and ambition of Kauravas and Pandavas. But why, then, was this an epic war? Why entire Aryavart plunged into this first real world-war? Why the echo of this ancient war still resonates after all those centuries? Rediscover the lost epic whose origin lies in the birth of the Kurukshetra that had tasted its first blood over a hundred years before the final Mahabharata war. Discover the complete saga of Mahabharata which goes far and beyond just Kauravas and Pandavas and their ambitions. THE ACCURSED GOD ================ Long before the epic battle, long before even the birth of Kurukshetra, a man swore on his father’s pyre to avenge against the mightiest empire, any civilization had ever seen. Between his might and near-certain destruction of the Empire, stood a warrior, who rose like a phoenix from the ashes of his seven dead brothers — taking the mantle of a fabled Accursed God. In the clash that followed, Aryavart heard several more oaths by the side of more burning pyres, until, a young king decided that no price is too high for peace. Little did he know that the price would be a war engulfing the entire Aryavart, where few would live to tell the tale. And only one man can delay the inevitable if not prevent it. He is the accursed God and even he doesn’t know that destiny is like a quicksand, the more he tries to prevent it, the faster Aryavart moves towards the ultimate catastrophe. Discover the saga of a man’s journey to that of a legendary and universally hated Accursed God, the saga of the ruthless ambitions and unfulfilled loves, endless deceits and vengeful oaths, and the saga of the battles to prevent the ultimate war. TESTIMONIALS ============= When is the last time you finished a book and discover something? Here is a gripping and intriguing take on the greatest epic of all time through the eyes of its pivotal character that leaves your mind exhilarated, adding a fresh perspective to the tale that’s known, yet unknown. Throughout the fast action-packed book, the author masterfully blends politics, war and science and blurs the gap between love and hate, peace and war, and fiction and reality. A must-read novel which will leave you wanting for more. --- Colonel Avanish, Indian Army"
                },
                {
                    id: 2,
                    title: "Harry Potter and the Prisoner of Azkaban",
                    author : "JK Rowling",
                    rating: "4.9",
                    price : "500",
                    cover: "https://kbimages1-a.akamaihd.net/69eca8ca-652c-4641-b86f-42de460a6d4d/1200/1200/False/harry-potter-and-the-prisoner-of-azkaban-6.jpg",
                    description: "Harry Potter and the Philosopher's Stone was J.K. Rowling's first novel, followed by the subsequent six titles in the Harry Potter series, as well as three books written for charity: Fantastic Beasts and Where to Find Them, Quidditch Through the Ages and The Tales of Beedle the Bard. The Harry Potter novels have now sold over 450 million copies worldwide and been translated into 78 languages."
                },
                {
                    id: 3,
                    title: "Harry Potter and the Chamber of Secrets",
                     author : "JK Rowling",
                    rating: "4",
                     price : "500",
                    cover: "https://kbimages1-a.akamaihd.net/1c469dcb-5d48-47cb-a61b-5298babdb0d3/1200/1200/False/harry-potter-and-the-chamber-of-secrets-6.jpg",
                    description: "Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as though turned to stone . Dobby's sinister predictions seem to be coming true."
                },
                {
                    id: 4,
                    title: "Harry Potter and the Half Blood Prince",
                     author : "JK Rowling",
                    rating: "4",
                     price : "280",
                    cover: "https://cdn01.sapnaonline.com/product_media/9781408855706/md_9781408855706.jpg",
                    description: "Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry's second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school's corridors warn that the 'Chamber of Secrets' has been opened and that the 'heir of Slytherin' would kill all pupils who do not come from all-magical families. These threats are found after attacks that leave residents of the school petrified. Throughout the year, Harry and his friends Ron and Hermione investigate the attacks."
                },
                {
                    id: 5,
                    title: "Harry Potter and the Goblet of Fire",
                     author : "JK Rowling",
                    rating: "4",
                     price : "280",
                    cover: "https://cdn11.bigcommerce.com/s-z7qq7adctg/images/stencil/500x659/products/674092/774560/btcl__84587.1522183285.jpg?c=2",
                    description: "Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry's second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school's corridors warn that the 'Chamber of Secrets' has been opened and that the 'heir of Slytherin' would kill all pupils who do not come from all-magical families. These threats are found after attacks that leave residents of the school petrified. Throughout the year, Harry and his friends Ron and Hermione investigate the attacks"
                },
                {
                    id: 6,
                    title: "Half Girlfriend",
                     author : "Chetan Bhagat",
                     price : "340",
                    cover: "https://images-na.ssl-images-amazon.com/images/I/712HEn9SNwL.jpg",
                    rating: "4.3",
                    description: "................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................"

                },
                {
                    id: 7,
                    title: "Five Little Pigs",
                    author: "Agatha Christie",
                     price : "340",
                    cover: "https://kbimages1-a.akamaihd.net/d54608a2-1499-47eb-bd78-e96b384c49e5/1200/1200/False/five-little-pigs.jpg",
                    rating: "4.5",
                    description: "................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................"

                },
                {
                    id: 8,
                    title: "The Count of Monte Cristo",
                    author: "Alexandre Dumas",
                     price : "459",
                    cover: "https://images-na.ssl-images-amazon.com/images/I/61qF6xsWq3L.jpg",
                    rating: "3.7",
                    description: "................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................"

                }
            ],
            users:[
                {
                    name:"Vindhya",
                    email:"vindhyamurari@gmail.com",
                    password:"1234"
                },
                {
                    name:"Jack",
                    email:"jack@gmail.com",
                    password:"aaa"
                }
            ],
            loggedInUser:{
                email:'',
                token:''
            },
            dataToSearch:{
                searchBy:'',
                searchText:''
            }
        }
    })
    return (
        <UserContext.Provider value={{state,dispatch}}>
           {props.children} 
        </UserContext.Provider>
    )
}

export {UserContext,ContextProvider}
