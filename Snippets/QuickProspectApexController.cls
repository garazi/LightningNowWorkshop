public class QuickProspectApexController {
	
    @AuraEnabled
    public static Boolean getProspect (String firstname, String lastname, String phone, String email, Id propertyID) {
        
        List<Prospect__c> prospect = [SELECT Id FROM Prospect__c WHERE firstname__c=:firstname AND lastname__c=:lastname LIMIT 1];
        
        if (prospect.size() == 0) {     
            Prospect__c newProspect = new Prospect__c(
                Name = firstname + ' ' + lastname,
                firstname__c = firstname,
                lastname__c = lastname,
                phone__c = phone,
                email__c = email);
            upsert newProspect;
            
            Id prospectID = newProspect.Id;
            Boolean success = createAssociation(propertyID, prospectID);
            return success; 
        } else {
            Id prospectID = prospect[0].Id;
            Boolean success = createAssociation(propertyID, prospectID);
            return success;
        }
    }
    
    private static Boolean createAssociation (ID propertyID, ID prospectID) {

        List<ProspectAssociation__c> prospectAssoc = [SELECT Id FROM ProspectAssociation__c WHERE Property_Name__c=:propertyID AND prospectname__c=:prospectID LIMIT 1];

        if(prospectAssoc.size() == 0) {
            ProspectAssociation__c newAssoc = new ProspectAssociation__c(
                Property_Name__c = propertyID,
                prospectname__c = prospectID
            );
            upsert newAssoc;
            Boolean success = true;
        	return success;
        } else {
        	Boolean success = false;
        	return success;
        }
    }
}