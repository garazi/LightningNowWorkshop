public class getAccountContacts {
@AuraEnabled
    public static List<Contact> getAccountContacts (Id recordId) {  
        List<Contact> contacts = [SELECT FirstName, LastName, Email FROM Contact WHERE AccountId=:recordId];
        return contacts;
    }
}