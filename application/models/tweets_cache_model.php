<?php
class Tweets_cache_model extends CI_Model {
    	
	var $keywords = '';
    var $tweets = '';

    function __construct() {
        parent::__construct();
    }
	
	function insert_cache($aData) {
        $this->keywords = $aData['keywords'];
        $this->tweets = json_encode($aData['tweets']);

        $this->db->insert('phpassignmentv2_twt_cache', $this);
    }

    function update_cache() {
    }
	
	function get_cache($sKeyword, $iTime) {
		$oQuery = $this->db->query("
			SELECT tweets 
			FROM phpassignmentv2_twt_cache 
			WHERE DATE_ADD(modified_date, INTERVAL ".$iTime." HOUR) >= NOW() 
			AND keywords = '".$sKeyword."' LIMIT 1");
		if ($oQuery->num_rows() > 0) {
			$oRow = $oQuery->row();
			return json_decode($oRow->tweets);
		} else {
			return false;
		}
	}
	
}