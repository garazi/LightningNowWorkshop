public class BusinessLocatorApexController {
@AuraEnabled
public static String getLocal (String searchTerm, Decimal lat, Decimal lon) {
  String url = 'https://grewis-yelp.herokuapp.com/search?address=' + lat +','+ lon + '&term=' + EncodingUtil.urlEncode(searchTerm, 'UTF-8');
  String resultList = getHttp(url);
  return resultList;   
}

private static String getHttp (String url) {
  HttpRequest req = new HttpRequest();
  Http http = new Http();
  req.setMethod('GET');    
  req.setEndpoint(url);
  HTTPResponse res = http.send(req);
  return res.getBody();
}

@AuraEnabled
public static String getListByAddress(Id recordId, String objectType, String searchQuery) {
        try {
    String location;
     if (objectType.toLowercase() == 'account') {            
                location = accountSelect(recordId);
            } else if (objectType.toLowercase() == 'contact') {
               location = contactSelect(recordId);
            }  else if (objectType.toLowercase() == 'property__c') {
                location = propertySelect(recordId);
            } else {
                return '{"error": "This component cannot be used on this page type."}';
            }      
    String url = 'https://grewis-yelp.herokuapp.com/search?address=' + EncodingUtil.urlEncode(location, 'UTF-8') + '&term=' + EncodingUtil.urlEncode(searchQuery, 'UTF-8');
    String resultList = getHttp(url);
        return resultList;
  }  catch(Exception ex){
      return '{"error": "' + ex.getMessage() + '"}';
  }
}

private static String contactSelect (Id recordId) {
  Contact contact = [SELECT MailingStreet, MailingCity, MailingState FROM Contact WHERE Id=:recordId];
  String location = contact.MailingStreet + ',' + contact.MailingCity + ',' + contact.MailingState;
  return location;
}

private static String accountSelect (Id recordId) {
  Account account = [SELECT BillingStreet, BillingCity, BillingState FROM Account WHERE Id=:recordId];
  String location = account.BillingStreet + ',' + account.BillingCity + ',' + account.BillingState;
  return location;
}

    private static String propertySelect (Id recordId) {
        Property__c property = [SELECT Address__c, City__c, State__c FROM Property__c WHERE Id=:recordId];
        String location = property.Address__c + ',' + property.City__c + ',' + property.State__c;
        return location;
    }
}
