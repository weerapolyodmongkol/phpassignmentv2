<form action="get_tweets" method="POST" id="searchform">
	<div class="row">
		<div class="col-md-6"><input type="text" name="keywords" id="keywords" class="form-control" placeholder="Enter Location" /></div>
		<div class="col-md-3"><button type="submit" class="btn btn-primary btn-block">Submit</button></div>
		<div class="col-md-3"><button class="btn btn-info btn-block" type="submit">History</button></div>
	</div>
	<input type="hidden" name="latlng" id="latlng" />
</form>