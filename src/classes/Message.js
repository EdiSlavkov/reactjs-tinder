export default  class Message{
    constructor(sender, text, date){
        this.sender= sender;
        this.text= text;
        this.date= new Date().slice(4, 24);
    }
}