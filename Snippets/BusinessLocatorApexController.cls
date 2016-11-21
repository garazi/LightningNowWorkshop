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
    public static String getListByAddress(Id recordId, String searchQuery) {
        try {
        String location = contactSelect(recordId);
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
}
