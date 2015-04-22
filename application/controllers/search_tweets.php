<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Search_tweets extends CI_Controller {

	public function index()
	{
		$this->load->view('header');
		$this->load->view('search_bar');
		$this->load->view('map_canvas');
		$this->load->view('footer');
	}

	public function get_tweets() {
		$keywords = $this->input->post('keywords');
		$keywords = rawurlencode($keywords);
		$latlng = $this->input->post('latlng');
		$latlng = substr($latlng, 1, -1);
		$latlng = preg_replace('/\s+/', '', $latlng);
		
		$settings = array(
		    'oauth_access_token' => "136895067-xkWGUOoFi8wSczagM0BOR1H5ErtV2CtaHsczmI7X",
		    'oauth_access_token_secret' => "AnPSy0H5AzdLAQIoqHmzgZqn9AzZuXIOQPaa6pjHhxDdd",
		    'consumer_key' => "kQ0UJEI2GfbeCL9jznkip6E32",
		    'consumer_secret' => "obpcx56mdOPsytcZ7mKmqAqFkgF6ewX1avOxuMdc5Uh19bXpKT"
		);
		$this->load->library('TwitterAPIExchange', $settings, 'TwitterAPIExchange');
        $service_url = 'https://api.twitter.com/1.1/search/tweets.json';
		$getfield = '?q='.$keywords;
		$getfield .= '&geocode='.$latlng.',50km';
		$tweets_response = $this->TwitterAPIExchange->setGetfield($getfield)
             ->buildOauth($service_url, 'GET')
             ->performRequest();
		$tweets = json_decode($tweets_response);
		
		$result_data = array();
		$result_data['latlng'] = $latlng;
		$result_data['keywords'] = $keywords;
		$result_data['tweets'] = $tweets;
		
		echo json_encode($result_data);
    }
}