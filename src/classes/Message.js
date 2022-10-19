class Message{
    constructor(sender, text, date){
        this.sender= sender;
        this.text= text;
        this.date= Date().slice(4, 21);
    }
}