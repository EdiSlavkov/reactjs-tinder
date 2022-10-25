export default class User{
            constructor(email, password){
                this.password = password;
                this.email = email;
                this.phone = "";
                this.username = "";
                this.gender = "";
                this.agePreference = [18, 100];
                this.distancePreference = 1;
                this.pictures = [];
                this.verified = [];
                this.age = "";
                this.pet = ""
                this.location = ""
                this.zodiacSign = ""
                this.smoking = ""
                this.description = ""
                this.genderPreference = ""
                this.school = ""
                this.job = ""
                this.company = ""
                this.passions = []
                this.likedPeople = []
                this.MatchedPeople = []
                this.chats = []
            }
}