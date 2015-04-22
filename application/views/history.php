<div class="row">
	<div class="col-md-12">
		<h1 class="text-center">History</h1>
	</div>
</div>
<div class="row">
	<div class="col-md-12">
		<table class="table table-striped">
			<?php $iI = 1; ?>
			<tr><th>#</th><th>Keyword</th></tr>
			<?php foreach ($aHistorys as $aHistory) { ?>
				<tr>
					<td>
						<?php echo $iI; ?>
						<input type='hidden' id="history-<?php echo $iI; ?>-keywords" value="<?php echo $aHistory['keywords']; ?>" />
						<input type='hidden' id="history-<?php echo $iI; ?>-latlng" value="<?php echo $aHistory['latlng']; ?>" />
					</td>
					<td><a href="#" id="history-<?php echo $iI; ?>" class="history-link" ><?php echo $aHistory['keywords']; ?></a></td>
				</tr>
				<?php $iI++; ?>
			<?php } ?>
		</table>
	</div>
</div>
