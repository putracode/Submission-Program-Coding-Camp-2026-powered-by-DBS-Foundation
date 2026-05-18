class Listener {
  constructor(applicationService, mailSender) {
    this._applicationService = applicationService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { applicationId } = JSON.parse(message.content.toString());

      const application = await this._applicationService.getApplication(applicationId);

      const result = await this._mailSender.sendEmail(
        application.job_owner_email,
        JSON.stringify(application),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Listener;
