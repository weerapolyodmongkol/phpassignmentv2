<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Search_tweets extends CI_Controller {

	public function index() {
		$this->load->view('header');
		$this->load->view('modal');
		$this->load->view('search_bar');
		$this->load->view('map_canvas');
		$this->load->view('footer');
		setcookie('history_search', serialize(array()), 0, '/');
	}
	
	/**
	 * get_tweets function
	 *
	 * @return void
	 * @author  
	 */
	public function get_tweets() {
		// twitter api setting
		$aSettings = array(
		    'oauth_access_token' => "136895067-xkWGUOoFi8wSczagM0BOR1H5ErtV2CtaHsczmI7X",
		    'oauth_access_token_secret' => "AnPSy0H5AzdLAQIoqHmzgZqn9AzZuXIOQPaa6pjHhxDdd",
		    'consumer_key' => "kQ0UJEI2GfbeCL9jznkip6E32",
		    'consumer_secret' => "obpcx56mdOPsytcZ7mKmqAqFkgF6ewX1avOxuMdc5Uh19bXpKT"
		);
		$this->load->library('TwitterAPIExchange', $aSettings, 'TwitterAPIExchange');
		
		//twitter api parameter
		$sKeywords = $this->input->get('keywords');
		$sKeywords = urldecode($sKeywords);
		$sKeywords = urlencode($sKeywords);
		$sLatlng = $this->input->get('latlng');
		$sLatlng = str_replace(array( '(', ')' ), '', $sLatlng);
		$sLatlng = preg_replace('/\s+/', '', $sLatlng);
		
		//fetch tweets
        $sServiceUrl = 'https://api.twitter.com/1.1/search/tweets.json';
		$sParameters = '?q='.$sKeywords;
		$sParameters .= '&geocode='.$sLatlng.',50km';
		$oTweetsResponse = $this->TwitterAPIExchange->setGetfield($sParameters)
             ->buildOauth($sServiceUrl, 'GET')
             ->performRequest();
		$sTweets = json_decode($oTweetsResponse);
		
		//result tweets
		$aResultData = array();
		$aResultData['latlng'] = $sLatlng;
		$aResultData['keywords'] = $sKeywords;
		$aResultData['tweets'] = $sTweets;
		
		// add to history
		$sCallType = $this->input->get('calltype');
		if ($sCallType != 'history') {
			$aHistory = $_COOKIE['history_search'];
			$aHistory = unserialize($aHistory);
			if (false == $aHistory) {
				$aHistory = array();
			}
			array_unshift($aHistory,array('latlng' => $sLatlng, 'keywords' => $sKeywords));
			setcookie('history_search', serialize($aHistory), 0, '/');
		}
		
		
		echo json_encode($aResultData);
    }
}