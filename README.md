# ai-interaction-webapp


Run the following commands from the root directory:
* Create virtual environment and set environment variables:

rm -rf env
python -m venv env
source env/bin/activate      
export FLASK_APP=run.py   
export FLASK_ENV=development

* Install dependencies:

pip install --upgrade pip
pip install -r requirements.txt

* Run the application:

flask run
