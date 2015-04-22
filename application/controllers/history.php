<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class History extends CI_Controller {
	public function index() {
		$aHistory = $_COOKIE['history_search'];
		$aHistory = unserialize($aHistory);
		if (false == $aHistory) {
			$aHistory = array();
		}
		$aData['aHistorys'] = $aHistory;
		$this->load->view('history', $aData);
	}
}
