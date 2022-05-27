# frozen_string_literal: true

describe AprCalculator::LoanValidator do
  context '#valid?' do
    let(:amount) { 10_000 }
    let(:term) { 36 }
    let(:loan) { AprCalculator::Loan.new(amount: amount, term: term) }

    subject { described_class.valid?(loan: loan) }

    context 'when valid' do
      before do
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_thirty_six?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_thirty_six_months_is_five_thousand?)
          .and_return(true)
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_forty_eight?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_forty_eight_months_is_ten_thousand?)
          .and_return(true)
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_sixty?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_sixty_months_is_fifteen_thousand?)
          .and_return(true)
      end
      it { expect(subject).to be_truthy }
    end

    context 'min amount for loans not up to 36 months when 5000' do
      before do
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_thirty_six?)
          .and_return(true)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_thirty_six_months_is_five_thousand?)
          .and_return(false)
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_forty_eight?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_forty_eight_months_is_ten_thousand?)
          .and_return(true)
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_sixty?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_sixty_months_is_fifteen_thousand?)
          .and_return(true)
      end

      it {
        expect do
          subject
        end.to raise_error(AprCalculator::BusinessValidationError, 'The min amount for loans up to 36 months is 5000')
      }
    end

    context 'min amount for loans not up to 48 months when 10000' do
      before do
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_thirty_six?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_thirty_six_months_is_five_thousand?)
          .and_return(true)
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_forty_eight?)
          .and_return(true)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_forty_eight_months_is_ten_thousand?)
          .and_return(false)
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_sixty?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_sixty_months_is_fifteen_thousand?)
          .and_return(true)
      end

      it {
        expect do
          subject
        end.to raise_error(AprCalculator::BusinessValidationError,
                           'The min amount for loans up to 48 months is 10000')
      }
    end

    context 'min amount for loans not up to 60 months when 15000' do
      before do
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_thirty_six?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_thirty_six_months_is_five_thousand?)
          .and_return(true)
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_forty_eight?)
          .and_return(false)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_forty_eight_months_is_ten_thousand?)
          .and_return(true)
        allow(AprCalculator::TermRules).to receive(:term_is_up_to_sixty?)
          .and_return(true)
        allow(AprCalculator::BaseRules).to receive(:the_min_amount_for_loans_up_sixty_months_is_fifteen_thousand?)
          .and_return(false)
      end

      it {
        expect do
          subject
        end.to raise_error(AprCalculator::BusinessValidationError,
                           'The min amount for loans up to 60 months is 15000')
      }
    end
  end
end
