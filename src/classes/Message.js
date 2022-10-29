export default  class Message{
    constructor(sender, text, date, seen){
        this.sender= sender;
        this.text= text;
        this.date= date;
        this.seen = seen;
    }
}